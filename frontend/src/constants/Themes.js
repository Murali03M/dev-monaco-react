import { loader } from "@monaco-editor/react";




const defineTheme = ({ theme, themeId }) => {

  return new Promise((resolve, reject) => {
    loader.init()
      .then((monaco) => {
        fetch(`/themes/${theme}.json`, {
          headers: {
            accept: 'application/json',
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Theme file not found: ${theme}.json (Status: ${response.status})`);
            }
            return response.json();
          })
          .then(themeData => {
            monaco.editor.defineTheme(themeId, themeData);
            monaco.editor.setTheme(themeId);
            resolve();
          })
          .catch((error) => {
            console.error(`Error loading theme: ${theme}`, error);
            reject(error);
          });
      })
      .catch((error) => {
        console.error(`Error initializing monaco: ${theme}`, error);
        reject(error);
      });
  });
};

export { defineTheme };

