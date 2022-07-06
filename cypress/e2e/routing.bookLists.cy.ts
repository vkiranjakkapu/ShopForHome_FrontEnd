import { AuthenticationsService } from "src/app/Services/authentications.service";

describe('User Authentication Tests', () => {
  let auth: AuthenticationsService;
  let inpData = { "email": "venkatakiranj@gmail.com", "password": "sainath", "id": 2 };
  let targetUrl = 'http://localhost:4200/';

  beforeEach(() => {
    auth = new AuthenticationsService();
    cy.visit(targetUrl);
  });

  it("Should Take back to the home page if accessed the dashoboard/Wishlist/Completed Pages before login", ()=>{
    cy.visit(targetUrl+'/dashboard');
    cy.url().should('contain', '/');
    
    cy.visit(targetUrl+'/dashboard/wishlist');
    cy.url().should('contain', '/');

    cy.visit(targetUrl+'/dashboard/completed');
    cy.url().should('contain', '/');
  });

  it('Should Take to the Wishlist Page if clicked on Wishlist option from Dashboard Navbar/Menu', () => {
    cy.get("[data-bs-target='#loginModal']").click();

    cy.get('[login-btn]').eq(0).should('be.disabled');

    cy.get("input[name='email']").type("sainath@gmail.com");
    cy.get("input[name='email']").clear(); // To avoid error with cypress while entering email's into field
    cy.get("input[name='email']").type("venkatakiranj@gmail.com");

    cy.get("input[name='password']").type("sainath");

    cy.get("[login-btn]").click();

    cy.url().should('contain', 'dashboard');

    cy.get("[routerLink='dashboard/wishlist']").eq(0).click()

    cy.url().should('contain', 'wishlist');
    auth.logout();
  });

  it('Should Take to the Complete List Page if clicked on Complete option from Dashboard Navbar/Menu', () => {
    cy.get("[data-bs-target='#loginModal']").click();

    cy.get('[login-btn]').eq(0).should('be.disabled');

    cy.get("input[name='email']").type("sainath@gmail.com");
    cy.get("input[name='email']").clear(); // To avoid error with cypress while entering email's into field
    cy.get("input[name='email']").type("venkatakiranj@gmail.com");

    cy.get("input[name='password']").type("sainath");

    cy.get("[login-btn]").click();

    cy.url().should('contain', 'dashboard');

    cy.get("[routerLink='dashboard/completed']").eq(0).click()

    cy.url().should('contain', 'completed');
    auth.logout();
  });

  it('Should Modify the wishlist of current user on clicking on Wishlist/Heart Icon (visible on hover over book) of a book', () => {
    cy.get("[data-bs-target='#loginModal']").click();

    cy.get('[login-btn]').eq(0).should('be.disabled');

    cy.get("input[name='email']").type("sainath@gmail.com");
    cy.get("input[name='email']").clear(); // To avoid error with cypress while entering email's into field
    cy.get("input[name='email']").type("venkatakiranj@gmail.com");

    cy.get("input[name='password']").type("sainath");

    cy.get("[login-btn]").click();

    cy.url().should('contain', 'dashboard');

    cy.get('.books-grid .book [modifyWishlist]').eq(0).click({force: true});
    
    // Initial Wishlist Count for the current user : 4
    cy.get("span[WishList-count]").should('have.text', 5);

    auth.logout();
  });

  it('Should Modify the Completed List of current user on clicking on Completed/Book Icon (visible on hover over book) of a book', () => {
    cy.get("[data-bs-target='#loginModal']").click();

    cy.get('[login-btn]').eq(0).should('be.disabled');

    cy.get("input[name='email']").type("sainath@gmail.com");
    cy.get("input[name='email']").clear(); // To avoid error with cypress while entering email's into field
    cy.get("input[name='email']").type("venkatakiranj@gmail.com");

    cy.get("input[name='password']").type("sainath");

    cy.get("[login-btn]").click();

    cy.url().should('contain', 'dashboard');

    cy.get('.books-grid .book [modifyCompleted]').eq(0).click({force: true});
    
    // Initial Completed Count for the current user : 3
    cy.get("span[Completed-count]").should('have.text', 4);

    auth.logout();
  });
})