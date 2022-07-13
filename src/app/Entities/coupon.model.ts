import { User } from "./user.model";

export class Coupon {
    public id!: number;
    public code!: string;
    public offprice: number = 0;
    public type: String = "specific";
    public user!: User;
    public expire!: Date;
    public validity: number = 1;
    public date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
}
