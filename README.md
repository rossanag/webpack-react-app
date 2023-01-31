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
  ``` __dirname ``` is a "magic" variable that holds the root project folder
  
  
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
You can put a minimal set of options into the devServer module tag.

11- Install Typescript and the types for React ``` npm install --save-dev typescript @types/react @types/react-dom ``` and create a tsconfig.json and add the configuration afterwards. To avoid the need to import React, you need to put the following jsx tag  value ``` "jsx": "react-jsx" ```
Under the hood it injects `import _jsx` and not `import React` which make the app faster, [here is the explanation](https://www.typescriptlang.org/docs/handbook/jsx.html)

12- Let's install the mini-css-extract-plugin, it splits the styles into separate .css files, it allows to load the styles asynchrounosly and on demand. It is convienient for production because it causes less payload. In the development phase use style-css.
``` npm install --save-dev mini-css-extract-plugin ```

13- In order to separate the webpack.config.js for development or production, our file returns a function rather than a file.
``` module.exports = (env, arg) => { 
      const { mode } = arg
      const isProduction = mode === 'production'
      return { .... }
```
`arg object` has the `mode` attribute, which indicates if we are in development or production stage.

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

14- We will use caching to save bandwidth to avoid unnecessary downloads, if the file didn't change we will use the cached version
```
output: {   
      filename: isProduction ? '[name].[contenthash].js' : 'main.js',
      path: path.resolve(__dirname, 'build')
}
```
`[name].[contenthash]` name is the default name and contenthash is a variable that stores the hash number. Hash will be generated only if you made any changes in the particular file and each file will be having the unique has number.
For Example, If you changed only main.js file, new hash will be generated only for the changed file. In most cases, you will be using ContentHash for production.
With the help of contenthash, you can implement long term caching in the browsers. Browser will serve the cached file as long as the hash remains same.

In the __build__ folder you will see the main cached file something like main.e94cb1e35809524bc14a.js
This will the main that will be injected into the build/index.html
``` <script defer="defer" src="main.e94cb1e35809524bc14a.js"></script> ```

__Note : devtool__ It allows to have two files of code, one compiled and full of non comprehensive symbols, and the original (source-map). This option is usefull to debug errors in in a plain JS where in development mode. 
Caveat: source-map creates some overhead.

15- We will instal Babel, a transpiler for JavaScript. Basically transforms code written with the last JS features and transform it into a code that can be understandable by older browsers.

``` npm install --save-dev @babel/core @babel/preset-env  @babel/preset-react @babel/preset-typescript babel-loader ```

We will use the babel-loader typescript loader instead ts-loader, the last one brought us some problems at the time to avoid import React in .ts files
Check the content of `babel.config.js`

15- Install [tailwind](https://tailwindcss.com/) 
  - ``` npm install -D tailwindcss postcss autoprefixer ```
  - ``` npx tailwindcss init ``` to create ts
  - PostCSS-loader is a webpack loader so you can process CSS with PostCSS inside Webpack.	
	``` npm install --save-dev postcss-loader postcss npm i -D  postcss postcss-loader postcss-preset-env ```
	
 __Note :__ after installing Tailwind  the h1, h2 html tags will have the same font and font size. Tailwind rid out the default styles from them. 
 There are two reasons:
  	- To avoid a collision with the Tailwind's scale
  	- Because of a UI rule, the headers shouldn't have any style in order to apply them consciously.
  (Source: [tailwind docs](https://tailwindcss.com/docs/adding-custom-styles#adding-base-styles))

16- Install the following plugin to use CSS modules  ``` npm install -D typescript-plugin-css-modules ```

17- Install Eslint, linting is fundamental to pursue a clean code by checking style and syntax.
``` npm --save-dev install eslint eslint-loader babel-eslint eslint-config-react eslint-plugin-react ```
By running ``` npm run eslint ``` you can set the rules for eslint.
Since I want to use semicolon, which isn set by default in the generic JS standard, so I need to add the following tag to the eslintrc.js
	``` semi: ["error", "always"] ``` it means, add semicolon always or you'll have an error otherwise.
	
18. Add react testing following in part this [jest tutorial](https://jestjs.io/docs/tutorial-react)
``` npm install -D @testing-library/jest-dom @testing-library/react @testing-library/react-hooks @testing-library/user-event  ```
In jest.config.js in the ``` setupFilesAfterEnv: ['./setupTest.ts'] ``` instead of ``` ['<roorDir>/setupTest.ts'] ```

19- We need to mock the CSS import modules, since jest doesn't understand CSS syntax.
We follow this [jest tutorial for importing CSS modules](https://jestjs.io/docs/webpack#mocking-css-modules)
	-  ``` npm install --save-dev identity-obj-proxy ```
	- ``` npm install --save-devbabel-jest jest-css-modules-transform ``` (according to this [stackoverflow post](stackoverflow: https://stackoverflow.com/questions/71881494/testing-css-modules-styles-in-testing-library))
	
	- ``` npm install --save-dev @types/jest ``` para TS
	
We modify jest.config.file for importing CSS modules
``` 
moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/src/__mocks__/fileMock.ts',
      '\\.(css|less|scss|sass)$': '<rootDir>/src/__mocks__/styleMock.ts',      
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy'  
    }
```    

The identity-obj-proxy is used to inject the class names into the snapshot file.
I had to create a __mock__ folder with the fileMock.ts and styleMock.ts for using CSS modules.

20- Running tests, you can see in package.json the differents options to run test.
The test I wrote create a snapshot folder in the same folder the test, the name is _snapshots_

__Note :__ I needed to import the latest version of jest-cli in order to correctly import .css files ``` npm i -D jest-cli@latest ``` 
There are several solutions around, but this one I found in a stackoverflow post was the only one it worked for me.

### References

[Webpack and babel for a reactjs application](https://dev.to/shivampawar/setup-webpack-and-babel-for-a-react-js-application-24f5)	
[Webpack with React and Babel](https://www.youtube.com/watch?v=FMNuTj89RzU) - spanish
[Webpack configurations react application](https://blog.logrocket.com/versatile-webpack-configurations-react-application/)
[Babel-preset-env explanation](https://babeljs.io/docs/en/babel-preset-env)
[Creating a react app with webpack](https://jsramblings.com/creating-a-react-app-with-webpack/)
[Easy debugging in react with webpack source-maps](https://medium.com/@Linda_Ikechukwu/easy-debugging-in-react-with-webpack-source-maps-5dd80a753cab)
[Set up react with ts babel and webpack-5](https://indrajitbnikam.hashnode.dev/set-up-react-with-ts-babel-and-webpack-5-in-just-25-steps)
[The complete guide for setting up react app from scratch feat typescript](https://dev.to/brandonwie/the-complete-guide-for-setting-up-react-app-from-scratch-feat-typescript-385b)
[Setup jest and react-testing-library in a react project step by stepguide](https://dev.to/ivadyhabimana/setup-jest-and-react-testing-library-in-a-react-project-a-step-by-step-guide-1mf0)
[Babel and TS](https://byby.dev/ts-with-babel)



	
