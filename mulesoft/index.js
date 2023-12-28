const express = require('express')
const jsforce = require('jsforce')
const bodyParser = require('body-parser')
const cors = require("cors")
const app = express()
var corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions))
const { PORT , ML_SERVER_URL , ML_LOGIN_URL, ML_PASSWORD, ML_USERNAME } = require('./src/config')
const authController = require('./src/controllers/authController')

//create a test api to check if server is running
app.get('/', (req,res) => {
    res.json({"success":true,"message":"server is running"})
})

//parse requests of content-type -application/json
app.use(express.json());


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/oauth2',authController)

//create a test api to check if server is running
app.get('/mlconnection',(req,res)=> {
    const conn = new jsforce.Connection({
        // you can change loginUrl to connect to sandbox or prerelease env.
        loginUrl : ML_LOGIN_URL
      });
      const username = ML_USERNAME
      const password = ML_PASSWORD //password + securitytoken
      conn.login(username, password, function(err, userInfo) {
        if (err) { return console.error(err); }
        // Now you can get the access token and instance URL information.
        // Save them to establish connection next time.
        console.log(conn.accessToken);
        console.log(conn.instanceUrl);
        // logged in user property
        console.log("User ID: " + userInfo.id);
        console.log("Org ID: " + userInfo.organizationId);
        // ...
        res.status(200).send({"success": true, 
                  "message": "connection is running successfully",
                  "accessToken": conn.accessToken,
                  "instanceUrl": conn.instanceUrl,
                  "UserId": userInfo.id,
                  "OrgId": userInfo.organizationId
        })
      });
})

app.listen(PORT,()=>{
    console.log(`server is running on: ${ML_SERVER_URL}`)
})