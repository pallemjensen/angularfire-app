import * as admin from 'firebase-admin';
import * as deleteProducts from './delete-product-funtion';
import * as uploadNewProductImage from './upload-productimage-function';
import * as productRest from './products-rest-endpoint';


admin.initializeApp()


module.exports = {
  ...deleteProducts,
  ...uploadNewProductImage,
  ...productRest
}
