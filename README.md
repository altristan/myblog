# myblog
<h3>Personalized blogging app using NestJS, React, and TypeScript </h3>

There should be a .env file for the frontend and backend.

For the frontend, add a <b>.env</b> file on <b>myblog/blog-frontend</b> and put this line of code:

REACT_APP_SERVER_BASE_URL=http://localhost:5000

For the backend, add a <b>.env</b> file on <b>myblog/blog-backend</b> and put this line of code and set your own values:

JWT_ACCESS_TOKEN_SECRET= <i>your_jwt_access_token_secret</i></br>
JWT_ACCESS_TOKEN_EXPIRATION_TIME= <i>your_jwt_access_token_exp_time (in seconds)</i></br>
JWT_REFRESH_TOKEN_SECRET= <i>your_jwt_refresh_token_secret</i></br>
JWT_REFRESH_TOKEN_EXPIRATION_TIME= <i>your_jwt_refresh_token_exp_time (in seconds)</i></br>

To run locally:
<li>Navigate first to <b>myblog/blog-backend</b> and run <b>npm run start</b></li><br>
<li>Then, navigate to <b>myblog/blog-frontend</b> and run <b>npm run start</b></li><br>

To run using Docker:
<li>Navigate first to <b>myblog/blog-backend</b> and run <b>docker build -f Dockerfile .</b></li><br>
<li>Then, navigate to <b>myblog/blog-frontend</b> and run <b>docker build -f Dockerfile .</b></li><br>
<li>Lastly, navigate to <b>myblog</b> and run <b>docker-compose -f docker-compose.yml up</b> </li><br>

Further plans:
<li>Improve frontend design (will probably use material design or still bootstrap)</li>
<li>Add new functionalities (upload profile picture probably using firebase)</li>
