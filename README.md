# Create an NPM Package in TS with React

Our objective is to create an JS external module working with NPM.
We will:
- use Typescript and do what we need with rollUp to export the code correctly
- use React and Hooks : we will import react from the main project containing the package
- use tsx components
- integrate and test this package with a standard next TS application
- work locally with this package and only publish it at the end

# Our first simple TS external module

At first, we need a new npm package.

## Requirements

You will need git, node and npm.
You can check if all is installed wih 
```shell
node -v
npm -v
```
We use node v14.7.4 and npm 7.20.3

## Prepare the project's creation

Find a name for your package, create a folder, init a git.

For this example, we create a folder react-ts-package in ~/dev/LEARN/npm.
From ~/dev/LEARN, we apply the following commands:

```shell
mdkir npm
cd npm && mkdir react-ts-package
cd react-ts-package
```
We are ready to create the module skeleton.

## Create the package structure

Inside /react-ts-package, run:

```
npm init
```
Say yes to all questions (for this example, we keep it simple). If you want a shortcut skipping all questions you can use 

```
npm init -y
```
You should have the corresponding output:

```
{
  "name": "react-ts-package",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}

```

## Add typescript

From /react-ts-package, install TS package with npm:

```
npm install --save-dev typescript
```

"The flag --save-dev will tell NPM to install Typescript as a devDependency. The difference between a devDependency and a dependency is that devDependencies will only be installed when you run npm install, but not when the end-user installs the package.

For example, Typescript is only needed when developing the package, but it’s not needed while using the package." 

Source : https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c

## In Summary

At this step, we have the following files and folder composing our module:
- two files : package-lock.json and package.json
- one folder : node_modules

In package.json we can find the only module we need for now : typescript

```
  "devDependencies": {
    "typescript": "^4.3.5"
  }
```

In node_modules folder, we can see only typescript is installed.

## Configure typescript

We begin with a very short and simple configuration for compiling Typescript into JS.

We add a configuration file directly in project root: tsconfig.json (/react-ts-package/tsconfig.json)

```
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./lib",
    "strict": true
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}

```

"target" is "The ECMAScript version target we want TypeScript to compile to" (prateeksurana.me), we use "es5" because " we want to build a package with browser compatibility" (itnext.io).

"outDir" is the location where we want to add the code built in JS.

exclude contains all folders we doesn't want to compile. "node_modules" are only used during development.

## Add your first code in the module

For checking if everything is fine, we will use a short example code that displays an "Hello World" string.

We create an *index.ts* file with this content:

```
export const SimpleTest = (name: string) => `Hello world`; 

```

Then we add a build script "tsc" in package.json.

We change the main directory reference because we build inside a lib folder:

```
"main": "lib/index.js",
```

Now our package should look like:

```
{
  "name": "react-ts-package",
  "version": "1.0.0",
  "description": "",
  "main": "lib/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build" : "tsc"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "typescript": "^4.3.5"
  }
}

```

## Build the module

Finally, we can build our module. When we build with npm, our files are compiled in JS into build folder.  From /react-ts-package:

```
npm run build
```

The result can be consulted in /lib folder.

## Create an application using the package

For testing our module, we will create a standard application using NextJs. This application will import our extension and use it.
We choose a standard Next Js application with Typescript.

We create the Next application:

```

```

## Todo

Everytime we will make a change in the package, we will have to rebuild it to see the changes in our next application because this application uses compiled files inside lib folder (the files in common js).


## References

- https://docs.npmjs.com/creating-node-js-modules
- https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c
- https://prateeksurana.me/blog/react-library-with-typescript/
