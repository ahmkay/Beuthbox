# beuthBOX Frontend

## Description

Frontend for the beutBOX videoplatform website

## Prerequisites

You will need a current version of `node` and `npm` to install and run this project. While this will work with many versions, this project is garuanteed to run under `node v14.18.1` and `npm 6.14.15`.

## Branches & Workflow

The default branch is called `dev`, which holds the most current version. New features should be developed in a branch with the following syntax `feature/my-new-feature`. When a feature is done, it has to be peer reviewed. For that purpose please create a pull request in GitHub and post the link to your coworkers.

For our stable releases we use the `master` branch. At the end of each development cycle the `dev` branch should be merged into the `master`. This branch should contain the most latest version which is used for the deployment.

## Local Development

### Setup

1. Install packages using `npm install`.
2. Start the webpack dev server using `npm start`. In order to start the dev server on a windows operating system use the intended `npm start:pc` script.
3. The Browser should open `http://localhost:8080` for you.
4. Making sure it runs:
   - the home route is active and images/slider/videos are displayed. If this is the case the data is provided correctly.

#### Development Scripts

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm start:pc`

Runs the webpack dev server on windows.

Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
Currently there are no tests implemented.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
