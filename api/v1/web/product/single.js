/**
 * This is Contain Save router/api.
 * @author Sandip Vaghasiya
 *
 */

 import { Joi } from '../../../../utilities/schemaValidate'
 import { Router } from 'express';
 import commonResolver from '../../../../utilities/commonResolver'
 import { getcontractorwithid } from "../../../../services/contractor/contractor";
 const router = new Router();

/**
 * @swagger
 * /api/v1/contractor/getcontractorwithids:
 *  post:
 *   tags: ["Contractor"]
 *   summary: get Contractor information.
 *   description: api used for get Contractor information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: get Contractor information.
 *        schema:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 *   security:
 *      - bearerAuth: [] 
 */

 router.post('/getcontractorwithids', commonResolver.bind({ modelService: getcontractorwithid, isRequestValidateRequired: true,  }))
export default router;
