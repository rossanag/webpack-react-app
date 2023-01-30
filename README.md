# webpack-react-app
A boilerplate for creating a Reactjs project without using create-react-app


### Introduction
  This project had the purpose to dig deeper into the concepts behind [babel](https://babeljs.io/) and [webpack](https://webpack.js.org/), like compiling and bundling. (Today, I use and recommend [Vite](https://vitejs.dev/)) 
  

### Step by Step process

1- Create the project folder, in this case webpack-react-app.

2- Within this folder execute this command: ```npm init -y``` .
  This command creates a package.json file, the -y parameter, responds every question to "yes". You can ommit it, and respond the questions.
  
3- Install webpack for development (-D or --save-dev option): ```npm install --save-dev webpack webpack-cli```.
  
  `Webpack is a static module bundler for modern JavaScript applications, it builds a dependency graph from one or more entry points and then combines every module your project needs into one or more bundles, which are static assets to serve your content from.
`

4- Change package.json in order to create the bundles for development and production respectively. This is achived by adding the following commands under the script tag:
```
  "scripts": {
    "build": "webpack --mode=production",
    "dev": "webpack serve --mode=development",    
  }
  ```
  
  So, if you are in the development phase, you run: ``` npm run dev ```
  
  6- Create the webpack configuration file: ``` touch webpack.config.js ``` .
  In my case I changed the default build folder from dist to bild, put the following in this file
  ```
  output: {
        	path: path.resolve(__dirname, 'build'),  // you must put the absolute path
     
  }
  ```
  7- We install react and react dom: ``` npm install react-dom -E ```
  The -E flag install the exact version, then every npm install won't install versions above the current one. It's useful when you need to have a better control over different versions.
  
