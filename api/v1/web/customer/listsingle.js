/**
 * This is Contain Save router/api.
 * @author Sandip Vaghasiya
 *
 */

 import { Joi } from '../../../../utilities/schemaValidate'
 import { Router } from 'express';
 import commonResolver from '../../../../utilities/commonResolver'
import { getSingleCustomer} from "../../../../services/customer/customer";
import { decodeJwtTokenFn } from '../../../../utilities/universal';
const router = new Router();


/**
 * @swagger
 * /api/v1/customer/getSingleCustomer:
 *  post:
 *   tags: ["Customer"]
 *   summary: get Contractor information.
 *   description: api used for get Contractor information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: get Contractor information.
 *        schema:
 *         type: object
 *         properties:
 *           phone:
 *             type: string
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 *   security:
 *      - bearerAuth: [] 
 */

 router.post('/getSingleCustomer',  commonResolver.bind({ modelService: getSingleCustomer, isRequestValidateRequired: false,schemaValidate: {} }))



export default router;
