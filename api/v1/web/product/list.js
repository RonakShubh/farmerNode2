/**
 * This is Contain Save router/api.
 * @author Sandip Vaghasiya
 *
 */

import { Joi } from '../../../../utilities/schemaValidate'
import { Router } from 'express';
import commonResolver from '../../../../utilities/commonResolver'
import { getProduct, listProductWithAggregation, listProductWithAggregationWithfacet, listProductWithPopulate } from "../../../../services/product/listproduct2";
const router = new Router();

/**
 * @swagger
 * /api/v1/product/getproduct:
 *  post:
 *   tags: ["Product"]
 *   summary: get product information.
 *   description: api used for get product information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: get Product information.
 *        schema:
 *         type: object
 *         properties:
 *           page:
 *             type: string
 *           limit:
 *             type: string
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 *   security:
 *      - bearerAuth: [] 
 */

router.post('/getproduct', commonResolver.bind({ modelService: listProductWithPopulate, isRequestValidateRequired: false, }))

export default router;
