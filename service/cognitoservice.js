'user strict';

var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
//ar CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

var userpoolId = '';
var clientId = '' ;

var poolData = {
    UserPoolId: '...', // Your user pool id here
    ClientId: '...' // Your client id here
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

function getUserProfile(userName,password) {

    var authenticationData = {
        Username : 'username',
        Password : 'password',
    };
    var userData = {
        Username: 'username',
        Pool: userPool
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            var accessToken = result.getAccessToken().getJwtToken();
    
            //POTENTIAL: Region needs to be set if not already set previously elsewhere.
            AWS.config.region = '<region>';
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: '...', // your identity pool id here
                Logins: {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>': result.getIdToken().getJwtToken()
                }
            });
            //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
            AWS.config.credentials.refresh((error) => {
                if (error) {
                    console.error(error);
                } else {
                    // Instantiate aws sdk service objects now that the credentials have been updated.
                    // example: var s3 = new AWS.S3();
                    console.log('Successfully logged!');
    
                    module.exports = {
                        getUserProfile: getUserProfile
                    };
                }
            });
        },
        onFailure: function (err) {
            console.log("error message"+JSON.stringify(err));
        },
    });

};

module.exports = {
    getUserProfile : getUserProfile
  };
