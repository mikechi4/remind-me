Install packages
`npm install`

To run react
`npm start`

To run node:
* Makesure you have Mongo running locally
### `cd src/src/server` then `nodemon server.js`

### To have node send emails

server is currently set to gmail as a service since that is what I had available to me. Enter your gmail info on line 17 & 18. For gmail to send mail, you will also have to set this to "ON"
https://myaccount.google.com/lesssecureapps?pli=1

```auth: {
                user: process.env.HOST_EMAIL,
                pass: process.env.HOST_EMAIL_PW
            }
```

### Client

    The client components can be find in `src/components`. We have log in route, sign up, and home.
    Home page. I make use of bootstrap styling as well as their Modal feature which will allow the user to enter their reminder info. If they want to edit their reminder info, they can toggle the edit button and it will allow them to edit the input field as well as date picker. This will send a PUT req to the db and update within Mongo.

### Backend

    The server files will live in `src/server`. All endpoints live inside this file.
    I handle auth using PassportJS implementing their persistent session ability.
