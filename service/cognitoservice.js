'use strict';

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const poolData = { UserPoolId : 'us-east-1_TcoKGbf7n',
    ClientId : '4pe2usejqcdmhi0a25jp4b5sh3'
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

function getUserProfile(body) {
    const authenticationData = {
        Username : body.userName,
        Password : body.Password,
    }; 
    const userData = {
        Username : body.userName,
        Pool : userPool
    };
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (session) {
           const tokens = {
               accessToken: session.getAccessToken().getJwtToken(),
               idToken: session.getIdToken().getJwtToken(),
               refreshToken: session.getRefreshToken().getToken()
           };
           cognitoUser['tokens'] = tokens; // Can be used later
           console.log("Authenticated User  : "+JSON.stringify(tokens));
           resolve(cognitoUser);
        },
        onFailure: function(err) {
            console.log("Unable to authenticate user   "+JSON.stringify(err));
            return reject(err);
        },
    });
}

module.exports = {
    getUserProfile : getUserProfile
  };