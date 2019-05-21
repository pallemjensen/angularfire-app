import * as admin from 'firebase-admin';
import * as deleteFriend from './delete-friend-funtion';
// import * as productRest from './products-rest-endpoint';


admin.initializeApp();


module.exports = {
  ...deleteFriend,
};
