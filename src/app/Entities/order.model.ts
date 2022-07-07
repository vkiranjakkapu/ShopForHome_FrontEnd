import { Product } from "./product.model";
import { User } from "./user.model";

export class Order {

    public id!: number;
    public user!: User;    
    public product!: Product;    
    public price!: number;
    private date = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();

    public Order(id?: number, user?: User, product?: Product, price?: number, date?: string) {
        if (id) {
            this.id = id;
        }
        if (user) {
            this.user = user;
        }
        if (product) {
            this.product = product;
        }
        if (price) {
            this.price = price;
        }
        if (date) {
            this.date = date;
        }
    }

    getOrederId(): number {
        return this.id;
    }

    setOrederId(id: number) {
        this.id = id;
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

    getPrice(): number {
        return this.price;
    }

    setPrice(price: number) {
        this.price = price;
    }

    getDate(): string {
        return this.date;
    }

    setDate(date: string) {
        this.date = date;
    }
}
