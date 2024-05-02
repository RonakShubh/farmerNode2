/**
 * This is Contain Save router/api.
 * @author Sandip Vaghasiya
 *
 */

 import { Router } from 'express';
 import commonResolver from '../../../../utilities/commonResolver'
 import { addProduct } from "../../../../services/product/addproduct";
 const router = new Router();
 

/**
 * @swagger
 * /api/v1/product/add:
 *  post:
 *   tags: ["Product"]
 *   summary: Save Contractor information.
 *   description: api used for Save Contractor information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: Save Contractor information.
 *        schema:
 *         type: object
 *         properties:
 *           productName:
 *             type: string
 *           productSKU:
 *             type: string
 *           productType: 
 *             type: string
 *           companyName:
 *             type: string
 *           procuctPrice:
 *             type: string
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 *   security:
 *      - bearerAuth: [] 
 */

 router.post('/add', commonResolver.bind({ modelService: addProduct, isRequestValidateRequired: false, schemaValidate: {} }))

export default router;
