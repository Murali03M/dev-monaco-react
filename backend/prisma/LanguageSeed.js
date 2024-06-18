

const LANGUAGE_MAPPING = {
    js: { judge0: 63,  name: "Javascript" },
    cpp: { judge0: 54,  name: "C++", monaco: "cpp" },
    rs: { judge0: 73, name: "Rust", monaco: "rust" },
};


import prisma from './prismaClient.js'


(async () =>
  await prisma.language.createMany({
    data: Object.keys(LANGUAGE_MAPPING).map((language) => ({
      name: LANGUAGE_MAPPING[language].name,
      judge0Id: LANGUAGE_MAPPING[language].judge0,
    })),
  }))();

  