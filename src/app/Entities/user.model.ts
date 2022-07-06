export class User {
    public uid!: number;
    public name!: string;
    public email!: string;
    public phone!: string;
    public discard!: number;
    public password!: string;
    public acctype!: string;
    public cart!: number[];
    public wishlist!: number[];

    constructor(uid?: number, name?: string, email?: string, phone?: string, discard?: number, password?: string, acctype?: string, cart?: number[], wishlist?: number[]) {
        if (uid) {
            this.uid = uid;
        }
        if (name) {
            this.name = name;
        }
        if (password) {
            this.password = password;
        }
        if (phone) {
            this.phone = phone;
        }
        if (email) {
            this.email = email;
        }
        if (acctype) {
            this.acctype = acctype;
        }
        if (discard) {
            this.discard = discard;
        }
        if (cart) {
            this.cart = cart;
        }

        if (wishlist) {
            this.wishlist = wishlist;
        }
    }

    getId(): number {
        return this.uid;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getPhone(): string {
        return this.phone;
    }

    getDiscard(): number {
        return this.discard;
    }

    getPassword(): string {
        return this.password;
    }

    getAcctype(): string {
        return this.acctype;
    }

    getCart(): number[] {
        return this.cart;
    }

    getWishList(): number[] {
        return this.wishlist;
    }

    setId(uid: number) {
        this.uid = uid;
    }

    setName(name: string) {
        this.name = name;
    }

    setEmail(email: string) {
        this.email = email;
    }

    setPhone(phone: string) {
        this.phone = phone;
    }

    setDiscard(discard: number) {
        this.discard = discard;
    }

    setPassword(password: string) {
        this.password = password;
    }

    setAcctype(acctype: string) {
        this.acctype = acctype;
    }

    setCart(cart: number[]) {
        this.cart = cart;
    }

    setWishlist(wishlist: number[]) {
        this.wishlist = wishlist;
    }
}
