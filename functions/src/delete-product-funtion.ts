import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

exports.deleteProduct = functions.firestore
  .document('products/{productID}')
  .onDelete((snap, context) => {
    return new Promise( async (resolve, reject) => {
      const deletedProduct = snap.data();
      if (deletedProduct) {
        try{
          await admin.firestore().collection('files')
            .doc(deletedProduct.pictureId)
            .delete()
            .then();

          const resultFromStorage = await admin.storage()
            .bucket().file('product-pictures/' + deletedProduct.pictureId)
            .delete()
            .then()

          resolve(resultFromStorage);
        } catch (err) {
          reject(err)
        }
      }
    });
  });
