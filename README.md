# Research Assistant
This project is a React application and is created with [Create React App](https://github.com/facebook/create-react-app). 

The project is a front-end application that aims to facilitate the use of [ChatGPT](https://chat.openai.com/) and [Google Gemini](https://gemini.google.com/app) in the research process.

It introduces 12 prompts each supporting different porpuses that researchers might need to use a free chatbot for, and then provides extra features for researchers to manipulate the generated answer (in the form of tables) later.

It is also designed in a way to support a descriptive method for adding new prompts based on the needs of every individual.

## Project Structure
### Code Base
This is the [main repository](https://github.com/mahsaSH717/research_assistant) and contains the code base. You can find the components in [src/components](src/components) and the constant files for defining prompt scenarios in [src/constants](src/constants).
### Examples
The [Example folder](examples) contains 3 subfolders each representing the results obtained by exploring the scenarios in 3 different research domains: LLMs, R0 estimate, and Impact Of climate change.

## Libraries used
The main packages used to build this project are:
  * [React Bootstrap](https://react-bootstrap.netlify.app/).
  * [react-csv](https://github.com/react-csv/react-csv#readme).
  * [react copy to clipboard](https://github.com/nkbt/react-copy-to-clipboard).
  * [react icons](https://react-icons.github.io/react-icons/).
  
  for a full list please refer to the [package.json](package.json)

## Installation

After cloning the project you can install the dependencies by running in the following command the project directory:

    npm install

## Running
Run the following command:

    npm run start

Open the browser and enter the URL of the application: http://localhost:3000/.
