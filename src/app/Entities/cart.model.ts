import { Product } from "./product.model";
import { User } from "./user.model";

export class Cart {

    private cid!: number;
    private user!: User;
    private product!: Product;
    private quantity!: number;
    private date = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
    
    public Cart(cid?:number, user?:User, product?:Product, quantity?:number, date?: string) {
        if (cid) {
            this.cid = cid;
        }
        if (user) {
            this.user = user;
        }
        if (product) {
            this.product = product;
        }
        if (quantity) {
            this.quantity = quantity;
        }
        if (date) {
            this.date = date;
        }
    }

    getCid(): number {
        return this.cid;
    }

    setCid(cid: number) {
        this.cid = cid;
    }

    getUser(): User {
        return this.user;
    }

    setUser(user: User) {
        this.user = user;
    }

    getProduct(): Product {
        return this.product;
    }

    setProduct(product: Product) {
        this.product = product;
    }

    getQuantity(): number {
        return this.quantity;
    }

    setQuantity(quantity: number) {
        this.quantity = quantity;
    }

    getDate(): string {
        return this.date;
    }

    setDate(date: string) {
        this.date = date;
    }
}
