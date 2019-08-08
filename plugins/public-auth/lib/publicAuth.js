
'use strict';

function PublicAuthenticator(pluginDef, pluginConf, serverConf) {
  console.log('PublicAuthenticator');

  this.authPluginID = pluginDef.identifier;
}

/*access requested is one of GET,PUT,POST,DELETE*/
PublicAuthenticator.prototype.authorized = function(request, sessionState) {
  console.log('publicAuthenticator.prototype.authorized');
  request.username = "publicUser";
  return Promise.resolve({ authenticated: true, authorized: true });
};

PublicAuthenticator.prototype.authenticate = function(request, sessionState) { 
  console.log('publicAuthenticator.prototype.authenticate');
  sessionState.authenticated = true;
  sessionState.username = "publicUser";
  return Promise.resolve({ success: true });
};

PublicAuthenticator.prototype.refreshStatus = function(request, sessionState) {
  console.log('refreshStatus');
  sessionState.authenticated = true;
  return Promise.resolve({ success: true });
};

PublicAuthenticator.prototype.getStatus = function(sessionState) {
  console.log('getStatus');
  return {  
    authenticated: true,
    username: "publicUser"
  };
},

module.exports = function(pluginDef, pluginConf, serverConf) {
  console.log('publicAuthInstaller');
  return Promise.resolve(
    new PublicAuthenticator(pluginDef, pluginConf, serverConf));
}

