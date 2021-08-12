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
export const SimpleTest = () => `Hello world`;

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

For testing our module, we will create a standard application using NextJs. This application will import our extension and use it. We will work, for now, locally without using npm registry.

For our JS application, we choose a standard Next Js application with Typescript.

Fom ~/dev/LEARN/npm, we create the Next application:

```
npx create-next-app --ts

```

We call it "standard-next".

The NextJs package.json should look like: 

```
{
  "name": "standard-next",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "11.0.1",
    "react": "17.0.2",
    "react-dom": "17.0.2"
  },
  "devDependencies": {
    "@types/react": "17.0.17",
    "eslint": "7.32.0",
    "eslint-config-next": "11.0.1",
    "typescript": "4.3.5"
  }
}
```

To sum up, in ~/dev/LEARN we have now two folders:
- our module react-ts-package
- our new NextJs application standard-next

## Import in a NextJs the react-ts-package

Our Next Application has to call our module code.
In NextJs we have an pages/index.ts page that render a welcome message. We will change this page for our test by the following content:

```
import styles from '../styles/Home.module.css';
import {SimpleTest} from 'react-ts-package/react-ts-package';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Create an NPM Package</h1>
      <p>Our message = {SimpleTest()}</p>
    </div>
  )
}

```

If, in standard-next/, you run 
```
npm run dev
```

You should see when checking http://localhost:3000/ our message "Hello world".

Everytime we will make a change in the react-ts-package, you will have to rebuild it (npm run build from /react-ts-package) to see the changes in our next application because this application uses compiled files inside lib folder (the files in common js).

On the contrary, all changes that you do in NextJs application appears instantly when you save. For example, If you change something in the index.tsx content, you should see the update automatically.

## In summary 2

Now we have two folders
- our module react-ts-package
- our new NextJs application standard-next

Our NextJs application is very simple and let us test our package code by importing our module. The application use our local module by reading the compiled file in its /lib folder.
Our react-ts-package use Typescript. But it doesn't use React, React Hooks and Jsx elements. We need to rebuild our package everytime for applying the changes inside the Next App.


## Add React inside the package

What we want now is to import not only a JS function written in TS but a React Component.

First, we need to import react inside our module. For adding react, we add the following snippet in react-ts-package/package.json

```
  "peerDependencies": {
    "react": "17.0.2",
    "react-dom": "17.0.2"
  }
```

We use "peerDependencies" and not "dependencies" because we don't want to install inside the module again but to use the react installation of the nextJs app wich will import our package.


Our package is a set of react components, it will requires an app able with react for using it. If we install react inside the package, there will be two react installation, this will cause trouble: when we will use hooks for example.

But we need some dev dependencies. Inside react-ts-package, we will install them with npm.

```
npm install --dev react-dom react @types/react-dom @types/react

```

Update tsconfig.json by adding the following lines to compilerOptions (if you don't, you should have some errors)
```
      "jsx": "react",
      "lib": ["es6", "dom", "es2016", "es2017"],
      "esModuleInterop": true
```

We can also exclude "lib" folder.


It should look like:
```
{
    "compilerOptions": {
      "target": "es5",
      "module": "commonjs",
      "declaration": true,
      "outDir": "./lib",
      "strict": true,
      "jsx": "react",
      "lib": ["es6", "dom", "es2016", "es2017"],
      "esModuleInterop": true
    },
    "include": ["src"],
    "exclude": ["node_modules", "lib"]
  }
```

Then, in react-ts-package, replace index.ts by index.tsx and the following content.

```
import React from "react";

const SayHello = (): JSX.Element => {
  return (
    <span>Hello World</span>
  )
};

export default SayHello;

```

Update index.tsx from NextJs app:

```
import styles from '../styles/Home.module.css';
import SayHello from 'react-ts-package/react-ts-package';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Create an NPM Package</h1>
      <p>Our message = <SayHello/></p>
    </div>
  )
}
```

It looks like we have a working package with react but...

## Use Hooks inside the package


### Check the error

... If we try to use hook, we will have a problem. Replace the content of the index.tsx of react-ts-package:

```
import React, {useState} from "react";

const SayHello = (): JSX.Element => {
  const [count] = useState(0);

  return (
    <div>Hello World {count}</div>
  )
};

export default SayHello;
```

When you load or reload http://localhost:3000/, you'll probably be confronted to the following error

```
Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem
```
### Work with hooks

Todo...
```
npm install rollup rollup-plugin-typescript2 rollup-plugin-sass babel-core babel-runtime
```

## Clean

### Add a .gitignore in react-ts-package

```
node_modules
```


## References

- https://docs.npmjs.com/creating-node-js-modules
- https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c
- https://prateeksurana.me/blog/react-library-with-typescript/
- https://nextjs.org/docs/basic-features/typescript

tocheck : https://igorluczko.medium.com/the-complete-guide-to-publish-react-hook-as-npm-package-880049829e89