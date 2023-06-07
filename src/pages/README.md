# How pages work
**This markdown explain the front-end aspect of the project.**
**Please refer to`/src/api/README.md` to read the API routes documentation explaining the routes defined in `src/pages/api`.**

The pathway corresponds to the routes' path in the project's architecture. In `_app.jsx`, a layout is defined that facilitates easy navigation through the pages. The elements within square brackets, such as `[pageId]`, are dynamic and adapt to the number specified in the URL. 

Data retrieval for display purposes is handled through a combination of `getServerSideProps` and injected React props. `getServerSideProps` is a Next.js function that fetches data on each request. React props, on the other hand, are arguments passed into a React component, providing the necessary data for rendering. Together, they ensure the appropriate data is available for each page render. 

This system ensures efficient and dynamic data handling, supporting seamless navigation and user experience across the entire project.

You'll find all the components in `/src/components`.
