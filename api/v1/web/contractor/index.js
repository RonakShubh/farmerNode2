/*
 * @file: index.js
 * @description: It's combine all contractor routers.
 * @author: Sandip Vaghasiya
 */

import save from './save';
import list from './list';
import edit from './edit';
import single from './single';
import deleteOne from './delete';

export default [save,list,edit,single,deleteOne];

