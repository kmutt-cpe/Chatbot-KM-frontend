## Project description

Knowledge management website for CPE KMUTT department.

This project is a senior project of CPE KMUTT Chatbot group 59 in King Mongkut's University of Technology Thonburi.

## Requirement

- Node version 12.18.1
- Yarn manager
- [KMUTT-CPE/Chatbot-Backend-API](https://github.com/kmutt-cpe/Chatbot-Backend-API)
  - Need to run this repository on http://localhost:3000.
- [Serve](https://yarnpkg.com/package/serve) (Optional) - Used for serve static web. But you can used another (If you have)

## File Structure

- `assets` - Keep other assets for decoration
  - `css`
  - `img`
  - `theme` - Keep main theme of project
- `common`
- `component` - React component that use in many places
- `domain` - Data (GraphQL query and mutation)
- `lib` - Dependency setup e.g. graphql connection, redux state
- `route` - Router of web app
- `view` - Each page of the project

## Development Instruction

1. `yarn install` or `yarn` to install `node_modules` that required for running app
2. Start `Chatbot-Backend-API` first (See Chatbot-Backend-API for how to start).
   - If start this project first, it will run at port 3000 which is my setting for backend-api connection. But if start backend first, this app will change port automatically.
   - But you can change url connection of backend-api in `.env.development`.
3. Use `yarn start`
   - If there is a question to change port from 3000 to another just type `y` (It will change to port 3001)

## Production Instruction

1. `yarn install` or `yarn` to install `node_modules` that required for running app
2. Start `Chatbot-Backend-API` (See Chatbot-Backend-API for how to start).
3. Use `yarn build` to build static file and keep in `build` folder.
4. (Optional) Use `serve -s build` for serve static file in build folder. But you can use other tools to serve static file.
   - But if you want to run with pm2 use `pm2 serve build 8082 --spa`. [Read more](https://www.loginradius.com/blog/async/react-app-deployment/) about this command.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `yarn lint`

Let's eslint to perform automated scans files for common syntax and style errors.

### `yarn prettier`

Let's prettier to scans files for style issues and automatically reformats your code to ensure consistent rules are being followed for indentation, spacing, semicolons, single quotes vs double quotes, etc.
