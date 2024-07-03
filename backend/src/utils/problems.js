import fs from "fs";
import path from "path"
import { fileURLToPath } from 'url';


const SUPPORTED_LANGS = ["js", "cpp", "rs"];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MOUNT_PATH = path.join(__dirname, '../../../problems')

export default async function getProblemDetails({ slug, languageId }) {
   console.log("Langugae",languageId);
  if (!SUPPORTED_LANGS.includes(languageId)) {
    throw new Error(`Unsupported language: ${languageId}`);
  }

  try {
    const fullBoilerplate = await getFullBoilerplate(slug, languageId);
    const inputs = await getProblemInputs(slug);
    const outputs = await getProblemOutputs(slug);

    return {
      id: slug,
      fullBoilerplateCode: fullBoilerplate,
      inputs: inputs,
      outputs: outputs,
    };
  } catch (error) {
    console.error("Error getting problem details:", error);
  }
}

function getFullBoilerplate(slug, languageId) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      `${MOUNT_PATH}/${slug}/boilerplate-full/function.${languageId}`,
      { encoding: "utf-8" },
      (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      }
    );
  });
}

function getProblemInputs(slug) {
  return new Promise((resolve, reject) => {
    fs.readdir(`${MOUNT_PATH}/${slug}/tests/inputs`, async (err, files) => {
      if (err) {
        return reject(err);
      }

      try {
        const data = await Promise.all(
          files.map((file) => {
            return new Promise((resolve, reject) => {
              fs.readFile(
                `${MOUNT_PATH}/${slug}/tests/inputs/${file}`,
                { encoding: "utf-8" },
                (err, data) => {
                  if (err) {
                    return reject(err);
                  }
                  resolve(data);
                }
              );
            });
          })
        );
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  });
}

function getProblemOutputs(slug) {
  return new Promise((resolve, reject) => {
    fs.readdir(`${MOUNT_PATH}/${slug}/tests/outputs`, async (err, files) => {
      if (err) {
        return reject(err);
      }

      try {
        const data = await Promise.all(
          files.map((file) => {
            return new Promise((resolve, reject) => {
              fs.readFile(
                `${MOUNT_PATH}/${slug}/tests/outputs/${file}`,
                { encoding: "utf-8" },
                (err, data) => {
                  if (err) {
                    return reject(err);
                  }
                  resolve(data);
                }
              );
            });
          })
        );
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  });
}


