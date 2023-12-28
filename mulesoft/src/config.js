require('dotenv').config()
module.exports={
    PORT:process.env.PORT || '3008',
    ML_LOGIN_URL:process.env.ML_LOGIN_URL || 'https://test.salesforce.com',
    ML_SERVER_URL:process.env.ML_SERVER_URL || 'http://localhost:3008',
    ML_USERNAME:process.env.ML_USERNAME ||'username',
    ML_PASSWORD:process.env.ML_PASSWORD || 'password',
    ML_CLIENT_ID: process.env.ML_CLIENT_ID || '',
    ML_CLIENT_SECRET: process.env.ML_CLIENT_SECRET || '',
    ML_CALLBACK_URL:process.env.ML_CALLBACK_URL || 'http://localhost:3008/oauth2/mlcallback'
}