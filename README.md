# Pissedtrest
:rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage:

Pissedtrest is a Pintrest clone...Instead of pinning things you like, you pin things you HATE. All those people who hang toilet paper wrong, can't park, make products that don't work properly... Here is your place to vent.


# Running Tests
Before you begin testing make sure you download the repository for Pissedtrest from GitHub. 
Install all the dependencies you need for the project and navigate to the working directory and do the following in your terminal

###### Step 1
> npm install

The above command will install all the dependencies you need

###### Step 2
Create test database in MySQL. Log into MySQL and run the test_schema.sql script to create the test database 

###### Step 3
Start GitBash terminal, run:  
NODE_ENV=test node server.js

The above command will start the server using the test environment variables. The config object should print in the terminal, to show that the correct variables are being used. If you see "Sequelize listening on PORT 3000" in your CLI, then you're good to go.

###### Step 4
Open a new GitBash instance and navigate to the working directory for Pissedtrest.

In the terminal type:
> npm test

The test file test.pin.js will drop and recreate the tables in the database_test database. It will insert data into the user, pin, and board tables and query the inserted data from the tables.
