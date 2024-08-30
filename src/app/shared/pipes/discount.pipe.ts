import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "discount",
})
export class DiscountPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const discount =
      ((args.discount as any[]) || [])?.filter(
        (a) => a.quantity == args.quantity
      )[0]?.discount || 0;

    const price = discount
      ? args.price * args.quantity -
        (args.price * args.quantity * discount) / 100
      : args.price * args.quantity;

    return price;
  }
}

// import { Pipe, PipeTransform } from "@angular/core";

// @Pipe({
//   name: "discount",
// })
// export class DiscountPipe implements PipeTransform {
//   transform(value: any, args?: any): any {
//     const discount =
//       ((args.discount as any[]) || [])?.filter((a) => a.quantity == 1)[0]
//         ?.discount ||
//       ((args.discount as any[]) || [])[0]?.discount ||
//       args.discount ;

//     const price = discount
//       ? args.price - (args.price * discount) / 100
//       : args.price;
//     return price;
//   }
// }
