import fs from "fs"
import prisma from './prismaClient.js'


const LANGUAGE_MAPPING = {
  js: { judge0: 63, name: "Javascript" },
  cpp: { judge0: 54, name: "C++",},
  rs: { judge0: 73, name: "Rust" },
};

const MOUNT_PATH = process.env.MOUNT_PATH || "../problems";

function promisifedReadFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) { 
        reject(err);
      }
      resolve(data);
    });
  });
}

async function main(problemSlug, problemTitle) {
  const problemStatement = await promisifedReadFile(
    `${MOUNT_PATH}/${problemSlug}/Problem.md`
  );

  const problem = await prisma.problem.upsert({
    where: {
      slug: problemSlug,
    },
    create: {
      title: problemSlug,
      slug: problemSlug,
      description: problemStatement,
    },
    update: {
      description: problemStatement,
    },
  });

  await Promise.all(
      Object.keys(LANGUAGE_MAPPING).map(async (language) => {
          console.log(LANGUAGE_MAPPING[language].name);
          const languageInfo = await prisma.language.findFirst({
              where: {
                
                name: LANGUAGE_MAPPING[language].name,
              }     
          })

          console.log(languageInfo);

      const code = await promisifedReadFile(
        `${MOUNT_PATH}/${problemSlug}/boilerplate/function.${language}`
      );
      await prisma.defaultCode.upsert({
        where: {
          problemId_languageId: {
            problemId: problem.id,
            languageId: languageInfo.id,
          },
        },
        create: {
          problemId: problem.id,
          languageId: languageInfo.id,
          code,
        },
        update: {
          code,
        },
      });
    })
  );
}

main(process.env.PROBLEM_SLUG, process.env.PROBLEM_TITLE);
