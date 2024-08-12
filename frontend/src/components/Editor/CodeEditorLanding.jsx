import { useState, useEffect } from "react";
import CodeEditor from "./CodeEditor";
import { languageOptions } from "../../constants/languageOptions";
import "react-toastify/dist/ReactToastify.css";
import { defineTheme } from "../../constants/Themes";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguageDropdown";
import { notify } from "../NotificationProvider/NotificationUtils";
import { CheckIcon, CircleX, ClockIcon } from "lucide-react";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";

const SubmitStatus = {
  PENDING: "PENDING",
  ACCEPTED: "AC",
  REJECTED: "REJECTED",
};

const Landing = ({ challenge }) => {
  const [processing, setProcessing] = useState(false);
  const [theme, setTheme] = useState("vs-dark");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [testCases, setTestCases] = useState([]);
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const [startTime, setStartTime] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Set start time when the component mounts
    setStartTime(Date.now());

    if (challenge?.defaultCode) {
      const defaultCodeObj = challenge.defaultCode.find(
        (code) => code.languageId === language?.value
      );
      if (defaultCodeObj) {
        setCode(defaultCodeObj.code);
        // Send initial code to the parent component
        onChange("code", defaultCodeObj.code);
      }
    }
  }, [challenge, language]);

  const onSelectChange = (sl) => {
    setLanguage(sl);
  };

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        toast.error("case not handled!", action, data);
      }
    }
  };

  async function pollWithBackoff(responseId, retries) {
    if (retries === 0) {
      setStatus("SUBMIT");
      toast.error("Not able to get status");
      return;
    }

    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/submission/${responseId}`);

      if (!response.data || !response.data.status) {
        throw new Error("Invalid response structure");
      }

      if (response.data.status === SubmitStatus.PENDING) {
        setTestCases(response.data.testcases || []);
        await new Promise((resolve) => setTimeout(resolve, 2.5 * 1000));
        pollWithBackoff(responseId, retries - 1);
      } else {
        if (response.data.status === SubmitStatus.ACCEPTED) {
          setStatus(SubmitStatus.ACCEPTED);
          setTestCases(response.data.testcases || []);
          toast.success("Accepted!");
        } else {
          setStatus(SubmitStatus.REJECTED);
          setTestCases(response.data.testcases || []);
          toast.error("Failed :(");
        }

        // Calculate and update accuracy
        const accuracy = calculateAccuracy(response.data.testcases || []);
        await updateSubmissionAccuracy(responseId, accuracy);

        return;
      }
    } catch (error) {
      console.error("Polling error:", error);
      toast.error("An error occurred while polling for submission status.");
      setStatus("SUBMIT");
    }
  }

  const handleCompile = async () => {
    if (!startTime) {
      console.error("Start time is not set");
      return;
    }

    const endTime = Date.now();
    const timeSpent = Math.floor((endTime - startTime) / 1000); // Time spent in seconds

    setStatus(SubmitStatus.PENDING);

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      setProcessing(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/submission`,
        {
          code: code,
          language: language.name,
          problemId: challenge.id,
          timeSpent: timeSpent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      pollWithBackoff(response.data.submission.id, 10);
    } catch (error) {
      console.error(
        "Submission error:",
        error.response ? error.response.data : error.message
      );
      notify.error(
        error.response ? error.response.data : error.message
      );
    } finally {
      setProcessing(false);
    }
  };

  const handleThemeChange = (selectedTheme) => {
    const theme = selectedTheme.label;
    const themeId = selectedTheme.key;
    defineTheme({ theme, themeId })
      .then(() => setTheme(themeId))
      .catch((error) => {
        console.error("Failed to define theme", error);
      });
  };

  return (
    <>
      <div className="h-4 w-full"></div>
      <div className="flex flex-row">
        <div className="px-4 py-2">
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme || ""} />
        </div>
      </div>
      <div className="flex flex-col space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-center">
          <CodeEditor
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme}
            challenge={challenge}
          />
        </div>
        <div className="flex flex-shrink-0 w-[30%] flex-col">
          <button
            onClick={handleCompile}
            disabled={processing}
            className="p-4 dark:border-white border-slate-700 dark:bg-white bg-slate-500 rounded-lg w-full mt-5 cursor-pointer"
          >
            {token ? (processing ? "Processing..." : "Execute") : "Login to submit"}
          </button>
        </div>
        <TestcaseRender testCases={testCases} />
      </div>
    </>
  );
};

export default Landing;

function renderResult(status) {
  switch (status) {
    case "AC":
      return <CheckIcon className="h-6 w-6 text-green-500" />;
    case "FAIL":
      return <CircleX className="h-6 w-6 text-red-500" />;
    case "TLE":
      return <ClockIcon className="h-6 w-6 text-red-500" />;
    case "COMPILATION_ERROR":
      return <CircleX className="h-6 w-6 text-red-500" />;
    case "PENDING":
      return <ClockIcon className="h-6 w-6 text-yellow-500" />;
    default:
      return <div className="text-gray-500"></div>;
  }
}

function TestcaseRender({ testCases }) {
  return (
    <div className="grid grid-cols-6 gap-4">
      {testCases.map((testcase, index) => (
        <div key={index} className="border rounded-md">
          <div className="px-2 pt-2 flex justify-center">
            <div>Test #{index + 1}</div>
          </div>
          <div className="p-2 flex justify-center">
            {renderResult(testcase.status)}
          </div>
        </div>
      ))}
    </div>
  );
}

const calculateAccuracy = (testCases) => {
  const totalTestCases = testCases.length;
  const passedTestCases = testCases.filter(testCase => testCase.status === 'AC').length;
  return (passedTestCases / totalTestCases) * 100; // Accuracy in percentage
};

const updateSubmissionAccuracy = async (submissionId, accuracy) => {
  try {
    await axios.put(`${BACKEND_URL}/api/v1/submissions/${submissionId}`, { accuracy }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    toast.success("Updated submission accuracy successfully");
  } catch (error) {
    toast.error("Error updating submission accuracy:", error);
  }
};
