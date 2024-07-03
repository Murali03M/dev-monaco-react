/* eslint-disable no-undef */
/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import CodeEditor from "./CodeEditor";
import { languageOptions } from "../../constants/languageOptions";
import "react-toastify/dist/ReactToastify.css";
import { defineTheme } from "../../constants/Themes";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguageDropdown";
import { notify } from "../NotificationProvider/NotificationUtils";

import { BACKEND_URL } from "../../config";
import axios from "axios";

const Landing = ({ challenge }) => {
  const [processing, setProcessing] = useState(false);
  const [theme, setTheme] = useState("vs-dark");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [code, setCode] = useState("");
  // const [status, setStatus] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (challenge?.defaultCode) {
      const defaultCodeObj = challenge.defaultCode.find((code) => code.languageId  === language?.value);
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
        console.log("data", data);
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompile = async () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Add this line to check the token
  
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
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      // Handle response if needed
    } catch (error) {
      console.error("Submission error:", error.response ? error.response.data : error.message);
      // Notify user of error
    } finally {
      setProcessing(false);
    }
  };
  


  const handleThemeChange = (selectedTheme) => {
    const theme = selectedTheme.label;
    const themeId = selectedTheme.key;
    defineTheme({   theme, themeId })
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
          <CodeEditor code={code} onChange={onChange} language={language?.value} theme={theme} challenge={challenge} />
        </div>
        <div className="flex flex-shrink-0 w-[30%] flex-col">
          <button
            onClick={handleCompile}
            disabled={processing}
            className="p-4 dark:border-white border-slate-700 dark:bg-white bg-slate-500 rounded-lg w-full mt-5 cursor-pointer" >
           {token ? (processing ? "Processing..." : "Execute") : "Login to submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Landing;
