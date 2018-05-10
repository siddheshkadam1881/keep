var labelModel = require("../model/labelModel");
var User = require("../model/User");


 function Label()
 { }

 /**
   * @description createUserlabel function to create label..
   * @class  createUserlabel
   * @extends {labelObj,userObj,callback}
   */

   Label.prototype.createUserlabel = function (labelObj,userObj,callback) {
     labelModel.createUserlabel(labelObj,userObj,callback);
   };


 /**
   * @description readUserlabel function to read label
   * @class  readUserlabel
   * @extends {userId,callback}
   */


   Label.prototype.readUserlabel = function (userId,callback) {
     labelModel.readUserlabel(userId,callback);
   };

 /**
   * @description deleteUserlabel function to delete label
   * @class  deleteUserlabel
   * @extends {userId,paramId,callback}
   */

   Label.prototype.deleteUserlabel = function (userId,paramId,callback) {
      labelModel.deleteUserlabel(userId,paramId,callback);
    };

 /**
   * @description updateLabel function to update Label
   * @class  updateLabel
   * @extends {labelId,userId,requestbody,callback}
   */

Label.prototype.updateLabel = function (labelId,userId,requestbody,callback)
{
   labelModel.updateLabel(labelId,userId,requestbody,callback);
};




 module.exports = new Label();
