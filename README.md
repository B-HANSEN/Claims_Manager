# Application name

Dummy name

## Overview

### Application walkthrough

This application has a main screen which consists of three sections:

- a table of claims with various details (holder name, insured item, incident date etc)
- available functions are (1) a claim search (by ID, holder name or policy number) as well as (2) a select feature which enables filtering by claim status. For a better user experience to work with the table, pagination has been added.
- a link section:

  - when clicking on the 'Create a new claim' button, the user is routed to a new page where a claim can be created
  - the admin section can be opened from the main page. This will render a modal based on a related URL query.

A page that enables the creation of a new claim. All fields are required to be filled to create a new entry in the database through an endpoint POST request.

A modal which opens based on a search query `/?admin`. The modal shows a welcome message and a link back to the main page.

In case the user inserts an incorrect URL, a Not Found page will indicate this, along with a link back to the main page.

## Architecture Overview

- [Frontend](/client): a React application built with Vite.
  The frontend calls a backend endpoint to fetch the claims.

- [Backend](/mock): The claims data are provided in the form of a json file which are fetched into the frontend. Through another endpoint, the user can also write into this database.

### Requirements

- Node v18.x or higher is required

### Start Application

To setup backend service, change directory to `mock/` and run `npm install`.
To start the server, run `npm run mock`.

To setup the frontend, change directory to `/client` and run `npm install`.
To start the frontend, run `npm start`.
The app will be running on http://localhost:3000/.

It is necessary to add the route `/claims` to render the main page: http://localhost:3000/claims

## Testing

To start the test runner, run `npm test`. Tests are powered by [Vitest](https://vitest.dev/).

- Several unit tests can be run, together with snapshot tests.
- Test files are placed together with the components in their respective folders.
- Test file format is `*.test.js`

## Code Quality

The project includes [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for linting and formatting.

- To lint: `npm run lint`
- To format: `npm run format`
