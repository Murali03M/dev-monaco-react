import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ProblemDefinitionParser } from "./ProblemDefinitionParser.js";
import { FullProblemDefinitionParser } from "./FullProblemDefinitionParser.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


function generatePartialBoilerplate(generatorFilePath) {
  const inputFilePath = path.join(__dirname, generatorFilePath, "Structure.md");
  const boilerplatePath = path.join(__dirname, generatorFilePath, "boilerplate");

  // Read the input file
  const input = fs.readFileSync(inputFilePath, "utf-8");

  // Parse the input
  const parser = new ProblemDefinitionParser();
  parser.parse(input);

  // Generate the boilerplate code
  const cppCode = parser.generateCpp();
  const jsCode = parser.generateJs();
  const rustCode = parser.generateRust();

  // Ensure the boilerplate directory exists
  if (!fs.existsSync(boilerplatePath)) {
    fs.mkdirSync(boilerplatePath, { recursive: true });
  }

  // Write the boilerplate code to respective files
  fs.writeFileSync(path.join(boilerplatePath, "function.cpp"), cppCode);
  fs.writeFileSync(path.join(boilerplatePath, "function.js"), jsCode);
  fs.writeFileSync(path.join(boilerplatePath, "function.rs"), rustCode);

  console.log("Boilerplate code generated successfully!");
}

function generateFullBoilerplate(generatorFilePath) {
  const inputFilePath = path.join(__dirname, generatorFilePath, "Structure.md");
  const boilerplatePath = path.join(__dirname, generatorFilePath, "boilerplate-full");

  // Read the input file
  const input = fs.readFileSync(inputFilePath, "utf-8");

  // Parse the input
  const parser = new FullProblemDefinitionParser();
  parser.parse(input);

  // Generate the boilerplate code
  const cppCode = parser.generateCpp();
  const jsCode = parser.generateJs();
  const rustCode = parser.generateRust();

  // Ensure the boilerplate directory exists
  if (!fs.existsSync(boilerplatePath)) {
    fs.mkdirSync(boilerplatePath, { recursive: true });
  }

  // Write the boilerplate code to respective files
  fs.writeFileSync(path.join(boilerplatePath, "function.cpp"), cppCode);
  fs.writeFileSync(path.join(boilerplatePath, "function.js"), jsCode);
  fs.writeFileSync(path.join(boilerplatePath, "function.rs"), rustCode);

  console.log("Boilerplate code generated successfully!");
}

const generatorFilePaths = process.env.GENERATOR_FILE_PATHS?.split(' ') ?? [];

generatorFilePaths.forEach((filePath) => {
    console.log(filePath);
    const fullPath = path.join('..', 'problems', filePath);
    generatePartialBoilerplate(fullPath);
    generateFullBoilerplate(fullPath);
});
