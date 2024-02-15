import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchpipe'
})
export class SearchpipePipe implements PipeTransform {

  transform(allOrder:any , searchkey:string): any[] {
    const result:any=[]
    if(!allOrder || searchkey === ""){
      return allOrder
    }
    allOrder.forEach((order:any)=>{
      if(order.name.trim().toLowerCase().includes(searchkey.trim().toLowerCase())){
        result.push(order)
      }
    })
    return result;
  }

}
