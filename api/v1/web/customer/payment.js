/**
 * This is Contain Save router/api.
 * @author Sandip Vaghasiya
 *
 */
 import { Joi } from '../../../../utilities/schemaValidate'
 import { Router } from 'express';
 import commonResolver from '../../../../utilities/commonResolver'
 import { addPayment } from "../../../../services/customer/customer";
 const router = new Router();

/**
 * @swagger
 * /api/v1/customer/payment:
 *  post:
 *   tags: ["Customer"]
 *   summary: Save customer information.
 *   description: api used for Save customer information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: Save customer information.
 *        schema:
 *         type: object
 *         properties:
 *           firstName:
 *             type: string
 *           lastName:
 *             type: string
 *           surName:
 *             type: string
 *           phone:
 *             type: string
 *           price:
 *             type: string
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 */

 const dataSchema = Joi.object({
  firstName: Joi.string().required().label("firstName"),
  lastName: Joi.string().required("lastName"),
  surName: Joi.string().default(1).required("surName"),
  phone: Joi.string().required().label("phone"),
  price: Joi.string().required().label("price")
});

router.post('/payment', commonResolver.bind({ modelService: addPayment, isRequestValidateRequired: true, schemaValidate: dataSchema }))




export default router;
