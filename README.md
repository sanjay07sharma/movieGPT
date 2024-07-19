### The Movie GPT

# Preview :  https://www.awesomescreenshot.com/video/29254993?key=ad9681b124370b38d7d67e869da92620

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# Setting up tailwind.css

### https://tailwindcss.com/docs/guides/create-react-app


### Install Tailwind CSS
Install tailwindcss via npm, and then run the init command to generate your tailwind.config.js file.

`
    npm install -D tailwindcss
    npx tailwindcss init
`


### Configure your template paths
Add the paths to all of your template files in your tailwind.config.js file.

tailwind.config.js
`
    /** @type {import('tailwindcss').Config} */
    module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    }
`

### Add the Tailwind directives to your CSS
Add the @tailwind directives for each of Tailwind’s layers to your ./src/index.css file.

index.css
`
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
`
Start your build process
Run your build process with npm run start.


# Feature we will build

- Login/signup screenowse page
    - Sign in/ Sign up Form
    - redirect to login
- Browser (After Login)
    - Header
    - Main movie
        -trailer in background
        - Title description play button
        - Movie suggestionns 
        - Movie list * n
- NetflixGPT
    - Search Bar
    - Movie Suggestion

# Concepts

- Routing
- Form validation
- useRef Hook

# Create a Firebase account

-Go to Firebase.
    Click on "Get started".
    Sign in with your Google account.
    Create a Firebase project

- Click on "Add project".
    Enter a name for your project and accept the terms, then click "Continue".
    You may also enable Google Analytics for the project, but this is optional. Click "Continue".
    Select your Google Analytics account or create a new account, then click "Create project".
    Add Firebase to your app

On the project overview page, click the web icon (</>) to add Firebase to your web app.
Register your app by entering your app's name. You can also set up Firebase Hosting at this stage by checking the box "Also set up Firebase Hosting for this app". Click "Register app".
Follow the instructions to add the Firebase SDK to your app. This involves copying the provided code snippet and pasting it into your app.
Set up Firebase Hosting

Install the Firebase CLI (Command Line Interface) by running `npm install -g firebase-tools` in your terminal.
Authenticate the Firebase CLI to your Google account by running `firebase login`.
Initialize your project by running firebase init in your project's root directory. Select "Hosting" and follow the prompts to set up the project.
Deploy your app by running `firebase deploy`.


# create a signup user account


# Setup Redux Store
- install @reduxjs/toolkit
- install react-redux
- create appStore.js -> `configureStore` from  with reducer function from `@reduxjs/toolkit`.
- configure userSlices with `createSlice` with reducer functions `addUser`, `removeUser` from `@reduxjs/toolkit`.
- add userSlice created to appStore
- Provide store to your app using `Provider` which comes from `react-redux`.

"In short create a store, create a slice add slice to store reducer function and then provide it to app" 

# Set up /browse on signIn
- setting an observer on the Auth object provided by firebase `onAuthStateChanged` from `firebase/auth`
- With signIn observation we `navigate` to `/browse` using `useNavigate` from react-router-dom.
- With sign out `naviagte` to `/`.

# Setting up movie DB
- Fetch from TMDB Movies.
- Create account on TMDB, register your app.
- Setup methods in browse component to get movie data using TMDB api.
- Setup movie slice in redux.
- Custom hook for now Playing movies.
- Planning for Main Container and Secondary Container.
- Fetch data for trailer video.
- Update the store with trialer video.
- Embedd the youtube video made it autoplay.
- Tailwind css to make mainContainer look awesome.
- Build Secondary component.
- Build Movie list
- Build movieCard

## Adding OpenAI Integration for Movie Recommendations

To enhance the movie recommendation feature in your application,
follow these steps to integrate OpenAI's GPT model into the `GptSearchBar` component.
This will allow users to receive movie suggestions directly from the OpenAI API.

1. **Integrate OpenAI API in `GptSearchBar.js`:**
   - Modify `GptSearchBar.js` to include functionality for fetching movie suggestions from the OpenAI API.
   - Implement input handling for initiating API calls upon user interaction.

2. **Handle Search Input and Button Clicks:**
   - Add a search input field and a button in the `GptSearchBar` component.
   - Implement `handleGptSearchClick` function to process user input and initiate
   a fetch request to the OpenAI API for movie recommendations.

3. **Update `package.json`:**
   - Add the OpenAI SDK to your project dependencies by running
   `npm install openai@^4.52.3` or adding `"openai": "^4.52.3"` manually to your `package.json` file.

4. **Create an OpenAI Utility File:**
   - Create a utility file named `openAi.js` in your utilities folder.
   - Initialize the OpenAI SDK with your API key in this file.

5. **Update Project Configuration:**
   - Ensure that your `package-lock.json` is updated with the newly added dependencies by running `npm install`.
   - Add your OpenAI API key to a constants file (e.g., `constants.js`).
   Make sure to name the constant `OPENAI_KEY` and keep it secure.

6. **Implementing the Feature:**
   - Use the search input to capture user queries.
   - Upon clicking the search button, use the `handleGptSearchClick`
   function to send the query to the OpenAI API and fetch suggestions.
   - Log the results to the console for further processing or directly display them in your UI.

This integration allows the `GptSearchBar` component to leverage OpenAI's powerful GPT-3.5 model
for generating on-demand movie recommendations, enhancing the user experience by providing personalized suggestions.


### Anthropic AI SDK integration

1. **Add Anthropic AI SDK to dependencies**
   - Added `@anthropic-ai/sdk` version `^0.24.3` to `package.json` and `package-lock.json`.
   - Updated `GptSearchBar.js` to use the Anthropic API for movie recommendations.

2. **Integrate Anthropic API in GptSearchBar component**
   - Replaced OpenAI API calls with Anthropic API for fetching movie suggestions.
   - Initialized Anthropic client with API key from `constants.js`.

3. **Update GptSearchBar styling and functionality**
   - Added semicolons and formatted code for consistency.
   - Improved API call handling and error logging.
   - Updated movie search logic to trim movie names.

4. **Store Anthropic API key in constants**
   - Added `ANTHROPIC_API_KEY` to `constants.js` for secure access in API calls.
