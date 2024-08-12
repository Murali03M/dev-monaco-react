/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ onChange, language, code, theme, challenge }) => {
  const [value, setValue] = useState( code || "");

  useEffect(() => {
    if (challenge?.defaultCode) {
      const defaultCodeObj = challenge.defaultCode.find((code) => code.languageId === language);
      if (defaultCodeObj) {
        setValue(defaultCodeObj.code);    
      }
    }
  }, [challenge, language]);

 
    const handleEditorChange = (value) => {
      setValue(value);
      onChange("code", value);
    };

 
  

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="65vh"
        width="100%"
        options={{
          fontSize: 18,
          scrollBeyondLastLine: false,
        }}
        language={language || "javascript"}
        value={value}
        theme={theme}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditor;
