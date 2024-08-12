import { loader } from "@monaco-editor/react";




const defineTheme = ({ theme, themeId }) => {

  console.log(themeId);
  return new Promise((resolve, reject) => {
    console.log(`Loading theme: ${theme}`);
    loader.init()
      .then((monaco) => {
        fetch(`/themes/${theme}.json`, {
          headers: {
            accept: 'application/json',
          }
        })
          .then(response => {
            console.log(`Response status: ${response.status}`);
            if (!response.ok) {
              throw new Error(`Theme file not found: ${theme}.json (Status: ${response.status})`);
            }
            return response.json();
          })
          .then(themeData => {
            console.log(`Defining theme: ${theme}`, themeData);
            monaco.editor.defineTheme(themeId, themeData);
            monaco.editor.setTheme(themeId);
            console.log(`Theme set: ${theme}`);
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

