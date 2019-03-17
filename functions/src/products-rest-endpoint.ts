import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

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
