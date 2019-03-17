import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

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
