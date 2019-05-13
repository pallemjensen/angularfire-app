import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as corsModule from 'cors';
const cors = corsModule({origin: true});

exports.products = functions.https.onRequest( (request, response) => {
  cors(request, response, async () => {
    if (request.method === 'GET') {
      admin.firestore().collection('products')
        .get().then(products => {
        const listOfProducts: any = [];
        products.forEach(product => {
          const prod = product.data();
          prod.id = product.id;
          listOfProducts.push(prod);
        });
        response.json(listOfProducts);
      })
        .catch(err => {
          console.log(err)
        })
    } else if (request.method === 'POST') {
      const data = request.body;
      console.log('data inc', data);
      const product: any = {name: data.name};
      const file = {
        name: data.image.name,
        type: data.image.type,
        size: data.image.size
      };
      try {
        const value = await admin.firestore().collection('files')
          .add(file)
          .then();

        const base64EncodedImageString = data.image.base64.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = new Buffer(base64EncodedImageString, 'base64');
        await admin.storage().bucket().file('friend-pictures/' + value.id)
          .save(imageBuffer, {
            gzip: true,
            metadata: {
              contentType: file.type
            }
          }).then();
        product.pictureId = value.id;
        const prod = await admin.firestore().collection('products')
          .add(product)
          .then();
        product.id = prod.id;
        response.json(product);
      } catch (err) {
        response.send(err)
      }
    } else {
      console.log('Method: ' + request.method);
      response.send("Not supported request, only GET and POST works!")
    }
  })
 });



exports.friends = functions.https.onRequest((request, response) => {
  admin.firestore().collection('friends')
    .get().then(friends => {
    const listOfProducts: any = [];
    friends.forEach(friend => {
      const prod = friend.data();
      prod.id = friend.id;
      listOfProducts.push(prod);
    })
    response.json(listOfProducts);
  }).catch(err => console.log(err))
});
