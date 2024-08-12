/* eslint-disable react/prop-types */
import { useState } from 'react';
import Landing from '../Editor/CodeEditorLanding';
import {  Submissions } from './Submission';


// const LANGUAGE_MAPPING = {
//     js: { judge0: 63,  name: "Javascript", monaco:"js" },
//     cpp: { judge0: 54,  name: "C++", monaco: "cpp" },
//     rs: { judge0: 73, name: "Rust", monaco: "rust" },
// };




const ChallengeSubmitBar = ({ challenge }) => {
  

 
 
  const [activeTab, setActiveTab] = useState("submit");
  

    return (
  <div className="flex  w-full ">
      <div className="w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="flex justify-center mb-4 border-b border-gray-200 dark:border-gray-700">
          <ul className="flex justify-between w-full text-md font-medium text-center" role="tablist">
            <li className="flex-1">
              <button
                className={`w-full p-4 rounded-t-lg ${activeTab === "submit" ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"}`}
                id="submit-tab"
                data-tabs-target="#submit"
                type="button"
                role="tab"
                aria-controls="submit"
                aria-selected={activeTab === "submit"}
                onClick={() => setActiveTab("submit")}
              >
                Submit
              </button>
            </li>
            <li className="flex-1">
              <button
                className={`w-full p-4 rounded-t-lg ${activeTab === "submission" ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"}`}
                id="submission-tab"
                data-tabs-target="#submission"
                type="button"
                role="tab"
                aria-controls="submission"
                aria-selected={activeTab === "submission"}
                onClick={() => setActiveTab("submission")}
              >
                Submissions
              </button>
            </li>
          </ul>
        </div>

        <div id="default-tab-content">
          <div
            id="submit"
            role="tabpanel"
            aria-labelledby="submit-tab"
            className={`${activeTab === "submit" ? "" : "hidden"}`}
          >
            <p>Submit Content</p>
                         <Landing challenge={challenge} />
          </div>
          <div
            id="submission"
            role="tabpanel"
            aria-labelledby="submission-tab"
            className={`${activeTab === "submission" ? "" : "hidden"}`}
          >
            <p>Submission Content</p>
           <Submissions challenge={challenge}  />
          </div>
        </div>
      </div>
    </div>
 
   
  );
};

export default ChallengeSubmitBar;


