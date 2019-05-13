// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
//
// exports.deleteProduct = functions.firestore
//   .document('friends/{productID}')
//   .onDelete((snap, context) => {
//     return new Promise( async (resolve, reject) => {
//       const deletedFriend = snap.data();
//       if (deletedFriend) {
//         try{
//           const resultFromStorage = await admin.storage()
//             .bucket().file('friend-pictures/' + deletedFriend.picture)
//             .delete()
//             .then();
//           resolve(resultFromStorage);
//         } catch (err) {
//           reject(err)
//         }
//       }
//     });
//   });
