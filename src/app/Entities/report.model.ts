import { Order } from "./order.model";
import { Product } from "./product.model";
import { User } from "./user.model";

export class Report {

    public id!: number;
    public order!: Order;
    public product!: Product;
    public user!: User;
    public coupon!: string;
    public orderPrice!: number;
    public actPrice!: number;
    public offerPrice!: number;
    public date!: string;

}
