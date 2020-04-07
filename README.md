### `npm start`

runs react 
### `cd src/src/server` then `nodemon server.js`

will run node

### To have node send emails 
 server is currently set to gmail as a service since that is what I had available to me. Enter your gmail info on line 17 & 18. For gmail to send mail, you will also have to set this to "ON" 
https://myaccount.google.com/lesssecureapps?pli=1
```            auth: {
                user: process.env.HOST_EMAIL,
                pass: process.env.HOST_EMAIL_PW
            }
```
