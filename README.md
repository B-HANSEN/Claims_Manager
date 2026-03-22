# Claims Manager

A React 19 application for managing insurance claims, deployed on [Vercel](https://claims-manager-lyart.vercel.app).

## Overview

### Application walkthrough

The landing page (`/`) shows the claims overview with a table containing various claim details (holder name, insured item, incident date, amounts etc.).

Available functions on the main screen:
- **Search** by claim ID, holder name or policy number
- **Filter** by claim status
- **Sort** by amount, processing fee, total amount and creation date — sortable columns are indicated with arrows
- **Pagination** — 10 rows per page with previous/next navigation

The description column adapts to available screen width: it wraps text and is hidden automatically if the screen is too narrow to display it at a minimum width.

A **Create a new claim** button routes the user to a form page where all fields are required. The claim is submitted via a POST request and added to the dataset.

An **Admin section** is accessible at `/admin`.

A **Not Found** page is shown for any unrecognised URL, with a link back to the main page.

## Architecture Overview

- [Frontend](/client): React 19 application built with Vite, using React Bootstrap for UI components, TanStack Table v8 for the claims table, and React Router v7 for routing.

- [Backend](/mock): A local Express mock server reads and writes claims from a JSON file. In production, a Vercel serverless function serves the claims data.

### Requirements

- Node v18.x or higher

### Start Application

To set up the backend, change directory to `mock/` and run:
```
npm install
npm run mock
```

To set up and start the frontend, change directory to `client/` and run:
```
npm install
npm start
```

The app will be running on http://localhost:3000.

## Testing

To start the test runner, run `npm test` from the `client/` directory. Tests are powered by [Vitest](https://vitest.dev/).

- Unit tests and snapshot tests are included.
- Test files are co-located with their components in `*.test.js` files.

## Code Quality

The project uses [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for linting and formatting.

- To lint: `npm run lint`
- To format: `npm run format`
