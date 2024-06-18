import fs from 'fs';
import path from 'path';
import { ProblemDefinitionParser } from './ProblemDefinitionParser';
import { FullProblemDefinitionParser } from './FullProblemDefinitionParser';

function generatePartialBoilerplate(generatorFilePath) {
  const inputFilePath = path.join(process.cwd(), generatorFilePath, 'Structure.md');
  const boilerplatePath = path.join(process.cwd(), generatorFilePath, 'boilerplate');

  if (!fs.existsSync(inputFilePath)) {
    throw new Error(`File not found: ${inputFilePath}`);
  }

  const input = fs.readFileSync(inputFilePath, 'utf-8');
  const parser = new ProblemDefinitionParser();
  parser.parse(input);

  const cppCode = parser.generateCpp();
  const jsCode = parser.generateJs();
  const rustCode = parser.generateRust();

  if (!fs.existsSync(boilerplatePath)) {
    fs.mkdirSync(boilerplatePath, { recursive: true });
  }

  fs.writeFileSync(path.join(boilerplatePath, 'function.cpp'), cppCode);
  fs.writeFileSync(path.join(boilerplatePath, 'function.js'), jsCode);
  fs.writeFileSync(path.join(boilerplatePath, 'function.rs'), rustCode);

  console.log('Boilerplate code generated successfully!');
}

function generateFullBoilerplate(generatorFilePath) {
  const inputFilePath = path.join(process.cwd(), generatorFilePath, 'Structure.md');
  const boilerplatePath = path.join(process.cwd(), generatorFilePath, 'boilerplate-full');

  if (!fs.existsSync(inputFilePath)) {
    throw new Error(`File not found: ${inputFilePath}`);
  }

  const input = fs.readFileSync(inputFilePath, 'utf-8');
  const parser = new FullProblemDefinitionParser();
  parser.parse(input);

  const cppCode = parser.generateCpp();
  const jsCode = parser.generateJs();
  const rustCode = parser.generateRust();

  if (!fs.existsSync(boilerplatePath)) {
    fs.mkdirSync(boilerplatePath, { recursive: true });
  }

  fs.writeFileSync(path.join(boilerplatePath, 'function.cpp'), cppCode);
  fs.writeFileSync(path.join(boilerplatePath, 'function.js'), jsCode);
  fs.writeFileSync(path.join(boilerplatePath, 'function.rs'), rustCode);

  console.log('Boilerplate code generated successfully!');
}

const generatorFilePaths = (process.env.GENERATOR_FILE_PATHS || '').split(' ');
generatorFilePaths.forEach(filePath => {
  if (filePath) {
    generatePartialBoilerplate(filePath);
    generateFullBoilerplate(filePath);
  }
});
