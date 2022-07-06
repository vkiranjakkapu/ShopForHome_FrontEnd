export class Book {
    private id!: number;
    private author!: string;
    private country!: string;
    private imageLink!: string;
    private language!: string;
    private link!: string;
    private pages!: number;
    private title!: string;
    private year!: number;

    constructor(id?: number, author?: string, country?: string, imageLink?: string, language?: string, link?: string, pages?: number, title?: string, year?: number) {
        if (id) {
            this.id = id;
        }
        if (author) {
            this.author = author;
        }
        if (country) {
            this.country = country;
        }
        if (imageLink) {
            this.imageLink = imageLink;
        }
        if (language) {
            this.language = language;
        }
        if (link) {
            this.link = link;
        }
        if (pages) {
            this.pages = pages;
        }
        if (title) {
            this.title = title;
        }
        if (year) {
            this.year = year;
        }
    }

    getId(): number {
        return this.id;
    }

    getAuthor(): string {
        return this.author;
    }

    getCountry(): string {
        return this.country;
    }

    getImageLink(): string {
        return this.imageLink;
    }

    getLanguage(): string {
        return this.language;
    }

    getLink(): string {
        return this.link;
    }

    getPages(): number {
        return this.pages;
    }

    getTitle(): string {
        return this.title;
    }

    getYear(): number {
        return this.year;
    }
    
}
