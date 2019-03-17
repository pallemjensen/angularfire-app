import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp()

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
        let prod = product.data();
        prod.id = product.id;
        listOfProducts.push(prod);
      })
    response.json(listOfProducts);
  }).catch(err => console.log(err))
});
