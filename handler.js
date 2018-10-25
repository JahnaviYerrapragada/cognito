'use strict';
var CogProfile = require('./service/cognitoservice');

module.exports.verifyToken = (event, context, callback) => {
  const body = JSON.parse(event.body);
  var userName = body.userName;
  var password = body.password;
  CogProfile.getUserProfile(userName,password).then(function(profile) {
    context.succeed(generatePolicy(userName, 'Allow', event.methodArn));
  }).catch(function(error) {
     context.fail("Unauthorized");
  })
};

var generatePolicy = function(principalId, effect, resource) {
    var authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
        var policyDocument = {};
        policyDocument.Version = '2012-10-17'; // default version
        policyDocument.Statement = [];
        var statementOne = {};
        statementOne.Action = 'execute-api:Invoke'; // default action
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    return authResponse;
}
