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
  The build option creates an optimized and minimified version.
  
  6- Create the webpack configuration file: ``` touch webpack.config.js ``` .
  In my case I changed the default build folder from dist to bild, so I put the following in this file
  ```
  output: {
        	path: path.resolve(__dirname, 'build'),  // you must put the absolute path
     
  }
  ```
  ``` __dirname ``` is a magic variable that holds the root project folder
  
  
  7- We install react and react dom: ``` npm install react-dom -E ``` .
  The -E flag install the exact version, then every npm install won't install versions above the current one. It's useful when you need to have a better control over different versions.
  
8- In order to import .css files as import styles.ccs without using the link reference in the html file, you need to install the loaders for styles
``` npm install style-loader css-loader --save-dev ```
style-loader recognize the styles it injects <style></style> tags into the DOM and css-loader allows to load images, use require/import of images __that are in the same project__  . So, if you don't to import, require or url css-loader isn't necessary
	
9- Install plugin to generate and html file automatically: ``` npm install html-webpack-plugin --save-dev ```
Modify webpack.config.js to webpack injects html basic template:
```
plugins : [
        new HtmlWebpackPlugin({template: './src/index.html'})
]
```
Add the following line at the top of the file ``` const HtmlWebpackPlugin = require('html-webpack-plugin') ```

10- Install ``` npm install -D webpack-dev-server ``` and configure devServer tag in webpack.config.js to open the browser inmediatelly and to refresh it after every change in the code.

```
	devServer: {
      static: {
        directory: path.join(__dirname, 'build')
      },
      open: true, // open browser inmediatelly
      port: 3000,
      compress: true,
      historyApiFallback: true,
      client: {
        overlay: true // show errors in browser
      }
    }
    
 ```
You can put a minimal options into devServer module tag.

11- Install Typescript and the types for React ``` npm install --save-dev typescript @types/react @types/react-dom ``` and create a tsconfig.json and add the configuration

12- Let's install the mini-css-extract-plugin, it splits the styles into separate .css files, it allows to load the styles asynchrounosly and on demand.
It is convienient for production, in the case of development, use style-css.
``` npm install --save-dev mini-css-extract-plugin ```

13- In order to separate the webpack.config.js for development or production, our file returns a function rather than a file.
``` module.exports = (env, arg) => { 
      const { mode } = arg
      const isProduction = mode === 'production'
      return { .... }
```
arg object has the mode attribute, which indicate if we are in development or production.
We have 2 objects defined in webpack.config.js , __rulesForTS__ and __rulesForAssets__ , please check them in the file. 
The rules tag into the module is an array of objects.
```
    rules: [
            rulesForTS,
            {
              test: /\.css$/,
              use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader']

            },
            rulesForAssets
          ]
```
If we are in production we use MiniCssExtractPlugin, otherwise style-loader. (Later on we'll talk about postcss-loader)

14- We will use caching to save bandwidth, if the file didn't change we will use the cached version
```
output: {   
      filename: isProduction ? '[name].[contenthash].js' : 'main.js',
      path: path.resolve(__dirname, 'build')
}
```
`[name].[contenthash]` name is the default name and contenthash is a variable that stores the hash number. Hash will be generated only if you made any changes in the particular file and each file will be having the unique has number.
For Example, If you changed only main.js file, new hash will be generated only for the changed file. In most cases, you will be using ContentHash for production.
With the help of contenthash, you can implement long term caching in the browsers. Browser will serve the cached file as long as the hash remains same.

15- We wil instal Babel, a transpiler for JavaScript. Basically transforms code written with the last JS features and transform it into a code that can be understandable by older browsers.

``` npm install --save-dev @babel/core @babel/preset-env  @babel/preset-react @babel/preset-typescript babel-loader ```

We will use the babel-loader typescript loader instead ts-loader, the last one brought us some problems at the time to avoid import React in .ts files
Check the content of `babel.config.js`

15- Instalar [tailwind](https://tailwindcss.com/) 
  - ``` npm install -D tailwindcss postcss autoprefixer ```
	- ``` npx tailwindcss init ``` to create ts
	- PostCSS-loader is a webpack loader so you can process CSS with PostCSS inside Webpack.
	
	``` npm install --save-dev postcss-loader postcss npm i -D  postcss postcss-loader postcss-preset-env ```
 __Note :__ after installing Tailwind  the h1, h2 html tags have the same font and font size. Tailwind rid out the styles. There are two reasons:
  - for avoid a colision with the Tailwind scale
  - There's a UI rule, headers don't have any style in order to apply consciously.
  (Based on [tailwind docs](https://tailwindcss.com/docs/adding-custom-styles#adding-base-styles))

