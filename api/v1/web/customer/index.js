/*
 * @file: index.js
 * @description: It's combine all customer routers.
 * @author: Sandip Vaghasiya
 */

import saveCustomer from './save';
import login from './login';
import list from './list';
import singleList from './listsingle';
import addpaymnet from './payment';
import paymentdata from './paymentdataget'


export default [saveCustomer, login,list,singleList,addpaymnet,paymentdata];

