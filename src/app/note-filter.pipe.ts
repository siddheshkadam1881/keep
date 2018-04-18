import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noteFilter'
})
export class NoteFilterPipe implements PipeTransform {



  transform(noteArray: Array<any>, args?: any): any {
    if(!noteArray) return [];
      //  debugger;
    return noteArray.filter((noteObj)=>{
      if(args){
        var flag = true;
        for(var index in args)
        {
          if(noteObj[index] != args[index])
          {
            flag = false;
            break;
          }
        }
        return flag;
      }
     return noteObj.is_pinned == false;

    });
  }


  // transform(noteArray: Array<any>, args?: any): any {
  //   return noteArray.filter((noteObj)=>{
  //
  //
  //
  //
  //
  //
  //
  //    debugger;
  //
  //     if(noteObj.is_pinned)
  //     {
  //     return noteObj.is_pinned == true;
  //    }
  //    // else if(noteObj.is_archieved)
  //    // {
  //    //  return noteObj.is_archieved == true;
  //    // }
  //    // else if(noteObj.is_deleted)
  //    // {
  //    //   return noteObj.is_deleted == true;
  //    // }
  //   });
  // }



}
