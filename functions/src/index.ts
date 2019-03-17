import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp()

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



exports.uploadNewProductImage = functions.storage.object().onFinalize((object) => {
  return new Promise( (resolve, reject) => {
    if (object && object.name && object.metadata){
      const fileMeta = {
        lastModified:  object.updated,
        name: object.metadata.originalName,
        type: "image/png",
        size: object.size
      };
      const nameForDoc = object.name.split('/')[1];
      admin.firestore().collection('files')
        .doc(nameForDoc)
        .set(fileMeta)
        .then(metaDataValue => resolve(metaDataValue))
        .catch(err => reject (err))
    }
    else {
      reject('Error happened, no metadata or filedata');
    }
  })
});

exports.products = functions.https.onRequest((request, response) => {
  admin.firestore().collection('products')
    .get().then(products => {
      const listOfProducts: any = [];
      products.forEach(product => {
        const prod = product.data();
        prod.id = product.id;
        listOfProducts.push(prod);
      })
    response.json(listOfProducts);
  }).catch(err => console.log(err))
});
