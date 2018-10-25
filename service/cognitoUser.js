'user strict';
const AccessToken = new CognitoAccessToken({ AccessToken:tokens.accessToken});
const IdToken = new CognitoIdToken({IdToken: tokens.idToken});
const RefreshToken = new CognitoRefreshToken({ RefreshToken: tokens.refreshToken});

const sessionData ={
    IdToken: IdToken,
    AccessToken: AccessToken,
    RefreshToken: RefreshToken
};

const userSession = new CognitoUserSession(sessionData);
const userData = {
    Username: email,
    Pool:this.userPool
};
const cognitoUser = new CognitoUser(userData);
cognitoUser.setSignInUserSession(userSession);
cognitoUser.getSession( function (err, session){
if(session.isValid()){
   //valid session
}
else {
    //Invalid Session
}
}
);