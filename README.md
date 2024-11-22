# RAWG simple app

To launch this app for the beginning install all dependencies:
npm install or yarn.

After this launch npm run dev or launch yarn dev

Decisions were maid
-

As was written on technical assignment we need to write a small app what will be written by using:

• Technical Proficiency: Proper use of React, Next.js, TypeScript, and Tailwind CSS.

• Code Quality: Clean, modular code and adherence to best practices.

• Integration Skills: Effective use of the RAWG API to display real-time data.

• User Experience: A simple, intuitive UI with responsive design.

Also, we need to use localStorage to store state of APP.

For fetching we used axios, not controlled with react query or RTK query for now.

For tabs, we used react-tabs instead react-router this time because we don't need it.

Also because we had not enough time so we don't used prettiers, precommits etc.

What I'll what to add for it to the future:
-
1. Decomposition.
2. Context API or state management. // redux toolkit with persist to localStorage manually
3. Prettier, precommit etc.
4. Tests. // added
5. More details for the tabs.
6. Routes?.
7. SEO?.
8. Add helpers function for the rendering.
9. Use tailwind inside scss modules.
10. Add utils functions to decrease markup
11. React query for requests and caching. // added with caching from box
12. Mouseflow or something like this to count user mouse actions.
13. Analytics?.