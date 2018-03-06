# Pissedtrest
:rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage:

https://github.com/grstoltz/pissedtrest/tree/master/public/images/logo.jpg

---
# Overview

Pissedtrest is a Pintrest clone...Instead of pinning things you like, you pin things you HATE. For all those times when people hang toilet paper wrong, take up two parking spaces, or make products that don't work properly... Here is your place to vent about it.

---
Check out the app running on heroku here: https://pissedtrest.herokuapp.com/

---
# Screenshot
![Screenshot](https://github.com/grstoltz/pissedtrest/tree/master/public/images/screen-shot.png)

---
# Design Team
- Alan Drake - Masonry Grid Layout, Handlebars.js
- Trish Mederos – Sequelize, Mocha/Chai and Nightmare testing
- Grant Stolz – Team Lead , Google o-auth, Amazon S3, routing
- Abby Thoresen – Wireframe, Bootstrap, Logo design


---
Technologies used
* Node.js - https://nodejs.org/en/
* MySQL - https://www.mysql.com/
* Handlebars - http://handlebarsjs.com/
* Bootstrap (http://getbootstrap.com)
* body-parser npm Package - https://www.npmjs.com/package/inquirer
* express npm Package - https://www.npmjs.com/package/express
* express-sessionnpm Package - https://www.npmjs.com/package/express-session
* express-handlbars npm Package - https://www.npmjs.com/package/express-handlebars
* handlebars npm Package - https://www.npmjs.com/package/handlebars
* mysql2 npm Package - https://www.npmjs.com/package/mysql2
* sequelize npm Package - https://www.npmjs.com/package/sequelize
* sequelize-cli npm Package - https://www.npmjs.com/package/sequelize-cli
* passport npm Package - https://www.npmjs.com/package/passport
* passport-google-oauth20 npm Package - https://www.npmjs.com/package/passport-oauth2
* dotenv npm Package - https://www.npmjs.com/package/dotenv
* cookie-parser npm Package - https://www.npmjs.com/package/cookie-parser
* easyimage npm Package - https://www.npmjs.com/package/easyimage
* mocha npm Package - https://mochajs.org/
* nightmare npm Package - https://www.npmjs.com/package/nightmare
* chai npm Package - https://www.npmjs.com/package/chai
* multer npm Package - https://www.npmjs.com/package/multer

Built With
* Sublime Text - Text Editor
* Visual Studio Code - Text Editor
* Bootstrap
* MySql Workbench

---
# Running Tests
Before you begin testing make sure you download the repository for Pissedtrest from GitHub. 
Install all the dependencies you need for the project and navigate to the working directory and do the following in your terminal

### Step 1
> npm install

The above command will install all the dependencies you need

### Step 2
Create test database in MySQL. Log into MySQL and run the test_schema.sql script to create the test database 

### Step 3
Start GitBash terminal, run:  
NODE_ENV=test node server.js

The above command will start the server using the test environment variables. The config object should print in the terminal, to show that the correct variables are being used. If you see "Sequelize listening on PORT 3000" in your CLI, then you're good to go.

### Step 4
Open a new GitBash instance and navigate to the working directory for Pissedtrest.

In the terminal type:
> npm test

The test file test.pin.js will drop and recreate the tables in the database_test database. It will insert data into the user, pin, and board tables and query the inserted data from the tables.

### Step 4
To run the browser test you run the file browser.test.js by typing the following command.
> npm run test:browser

This test will produce an output file in the working directory named login.png. This file will be an image of the login screen.



