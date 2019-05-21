import * as admin from 'firebase-admin';
import * as deleteFriend from './delete-friend-funtion';

admin.initializeApp();

module.exports = {
  ...deleteFriend,
};
