# SimpleBks

## Project Setup
* Open a terminal
* Clone the repository with this command `git clone https://github.com/ifeekz/simplebks.git`
* Then change to the project directory `cd simplebks`

### Backend
* Then change directory to `cd backend`
* Copy the `.env.example` file with this command:
    * Windows: `copy .env.example .env`
    * Linux/Mac: `cp .env.example .env`
* Edit the `.env` file to your MongoDb credential where you see YOUR_DB_USERNAME, YOUR_DB_PASSWORD, YOUR_DB_NAME for the DB username, password and database name respectively.
* Run `npm start` to start the backend server
* Note the backend url displayed on the terminal

### Frontend
* Open another terminal
* Then change directory to `cd path/to/simplebks/frontend`
* Copy the `.env.example` file with this command:
    * Windows: `copy .env.example .env`
    * Linux/Mac: `cp .env.example .env`
* Edit the `.env` varaible, `VUE_APP_BACKEND_URL` to have the server (backend) url as the value.
* Run `npm run serve` to start the frontend server
* Launch the frontend url displayed on your terminal on any browser