
class Auth {

  /**
   * Authenticate a user. Save a token stringand timestamp in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(token) {
    var d = new Date();
    localStorage.setItem('timestamp',d.getTime());
    localStorage.setItem('token', token);
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage and the amount of time passed from last login
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  /**
   * Checks if the user's token is still valid. Deauthenticates the user if it isn't.
   *
   */
  static checkTokenExpiration() {
    var d = new Date();
    var timePassed = d.getTime() - localStorage.getItem('timestamp')
    //Removes token if more than 12 hours have passed since last login (token limit)
    if(timePassed > 12*60*60*1000){
      this.deauthenticateUser();
    }
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    localStorage.removeItem('token');
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken() {
    return localStorage.getItem('token');
  }

}

var axios = require('axios');
/* The interceptor below will add the authorization header to all axios request.
This should prevent issues where we do not add the header by mistake.*/
axios.interceptors.request.use(function (config) {

  var token = Auth.getToken();

  if (token) {
    config.headers['authorization'] = 'Bearer ' + token;
  }
  return config;
}, function (err) {
  return Promise.reject(err);
});

export default Auth;

