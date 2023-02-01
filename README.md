# TinsellyCone's Canvas Dashboard

This is a project that uses the API from Instructure's Canvas LMS to create a more visually appealing and more function front-end.

## Setup
Generate an API key via Canvas user settings

Clone the repository to a local folder, then create a .env.local file in the main directory. Insert the following code using your Canvas parameters:
```
API_KEY=your_key_here
BASE_DOMAIN=schoolname.instructure.com
```
Then, you can either run the command to start the development environment:
```bash
npm run dev
```
OR:

You can run the commands to start the production environment:
```bash
npm build
npm start
```


## Work In Progress
Right now, this is a very basic system, and a lot of work still needs to be done. 

TODO:
- Submissions
- OAuth2
- Improve page load times
- Deal with Google Doc submissions (somehow)
- Get user grades to display on Dashboard
- Create integration with other SIS systems such as Follett Aspen
