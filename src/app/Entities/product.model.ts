export class Product {
    public pid!: number;
    public name!: string;
    public image!: string;
    public price!: number;
    public stock!: number;
    public category!: string;
    public brandName!: string;

    constructor(pid?: number, name?: string, image?: string, price?: number, stock?: number, category?: string, brandName?: string) {
        if (pid) {
            this.pid = pid;
        }
        if (name) {
            this.name = name;
        }
        if (image) {
            this.image = image;
        }
        if (price) {
            this.price = price;
        }
        if (stock) {
            this.stock = stock;
        }
        if (category) {
            this.category = category;
        }
        if (brandName) {
            this.brandName = brandName;
        }
    }

    getId(): number {
        return this.pid;
    }

    setId(pid: number) {
        this.pid = pid;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string) {
        this.name = name;
    }

    getImage(): string {
        return this.image;
    }

    setImage(image: string) {
        this.image = image;
    }

    getPrice(): number {
        return this.price;
    }

    setPrice(price: number) {
        this.price = price;
    }

    getStock(): number {
        return this.price;
    }

    setStock(stock: number) {
        this.stock = stock;
    }

    getCategory(): string {
        return this.category;
    }

    setCategory(category: string) {
        this.category = category;
    }

    getBrandName(): string {
        return this.brandName;
    }

    setBrandName(brandName: string) {
        this.brandName = brandName;
    }
}
