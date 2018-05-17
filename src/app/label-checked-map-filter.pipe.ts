import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelCheckedMapFilter'
})
export class LabelCheckedMapFilterPipe implements PipeTransform {

  transform(labelArray: any, noteLabelArray?: any): any {
    // if(!labelArray) return [];
    // labelArray = labelArray.map(labelObj=>{
    //   let flag = false;
    //   if(noteLabelArray && noteLabelArray.length >0 && noteLabelArray.indexOf(labelObj._id) >= 0 ){
    //     flag = true;
    //   }
    //   labelObj.checked = flag;
    //   return labelObj
    // })
    return labelArray;
  }

}
