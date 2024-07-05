# Interswitch backend assessment API by Okorie-Chinedu-Sunday

Repository for Interswitch backend assessment of Okorie Chinedu Sunday

# Introduction

This project is about a RESTful API for user and post management. users will be able to create account, login into their account. upon successful login, the user will be to view,create, update, and delete posts and comment.

The API uses caching for faster data retrieval, rate limiting for some endpoints to mitigate against abuse.

# Folder Structure

1. **controllers** : This contains the business logic for the application.
2. **models** : This contains models or structure of the application resources like User and Post and Comment
3. **routes** : This contains files that handles all the api routes.
4. **utils** : This contains utility logics like some of which are reused in some part of the applications.
5. **validation** : This contains files for validation logics.
6. \***\*tests\*\*** : This contains files for unit tests.

## How to set up the application locally

1. Clone the repository using the command `git clone https://github.com/profchiso/interswitch-assessment-be.git`
2. Change directory to the cloned app using the command `cd interswitch-assessment-be`
3. Install all dependencies using the command `npm install`
4. Set the environment variables as found **[here](https://github.com/profchiso/interswitch-assessment-be/blob/main/env.example.txt)**
5. Run the application using the command `npm start` or `npm run dev` to run the application using `nodemon`

# Other information

- The documentation on how to use the api is **[here](https://github.com/profchiso/interswitch-assessment-be/blob/main/Interswitch-assessment.postman_collection.json)** which can be imported into postman app

- **Features**: Users can Create, view, update and delete post and comment. create user,view users, and user login. user cannot delete or update a post or comment that does not belong to them

- **Technologies** Nodejs, express and MongoDB alongside with relevant NPM libraries
