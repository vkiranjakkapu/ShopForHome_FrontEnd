import { AuthenticationsService } from "src/app/Services/authentications.service";

describe('User Authentication Tests', () => {
  let auth: AuthenticationsService;
  let inpData = { "email": "venkatakiranj@gmail.com", "password": "sainath", "id": 2 };
  let targetUrl = 'http://localhost:4200/';

  beforeEach(()=>{
    auth = new AuthenticationsService();
    cy.visit(targetUrl);
  });

  it('Should Take to the dashboard if a Token was found/user already logged In earlier', () => {
    auth.localAuthnticate(inpData).then((res) => {
      cy.url().contains('dashboard');
      auth.logout();
    }).catch((err) => {
      cy.visit(targetUrl);
      cy.url().should('not.include', 'dashboard');
    });
  });

  it("Should check Login button disabled by default", () => {
    cy.get("[data-bs-target='#loginModal']").click();

    cy.get('[login-btn]').eq(0).should('be.disabled');
  })

  it("Should Validate Email field while Logging In", () => {
    cy.get("[data-bs-target='#loginModal']").click();
    
    cy.get("input[name='email']").type("sainath@gmail.com");
    cy.get("input[name='email']").clear();
    cy.get("input[name='email']").eq(0).should('have.class', 'is-invalid');
    cy.get("input[name='email']").type("sainath@gmail.com");
    cy.get("input[name='email']").eq(0).should('have.class', 'is-valid');

    cy.get("[login-btn]").eq(0).should('be.disabled');
  })

  it("Should Validate Password field while Logging In", () => {
    cy.get("[data-bs-target='#loginModal']").click();
    
    cy.get("input[name='password']").type("sainath_");
    cy.get("input[name='password']").clear();
    cy.get("input[name='password']").eq(0).should('have.class', 'is-invalid');
    cy.get("input[name='password']").type("sainath_");
    cy.get("input[name='password']").eq(0).should('have.class', 'is-valid');

    cy.get("[login-btn]").eq(0).should('be.disabled');
  })

  it("Should display error message when Authenticating using invalid credentials.", () => {
    cy.get("[data-bs-target='#loginModal']").click();
    
    cy.get("input[name='email']").type("sainath@gmail.com");
    cy.get("input[name='email']").clear();
    cy.get("input[name='email']").type("sainath@gmail.com");

    cy.get("[login-btn]").eq(0).should('be.disabled');
    
    cy.get("input[name='password']").type("sainath_");
    
    cy.get("[login-btn]").eq(0).should('not.be.disabled');

    cy.get("[login-btn]").click();
    cy.get("[login-alert]").should('contain.text', " Wrong Username/Password Combination ");
  })

  it("Should Redirect the user to dashboard after successful Authentication.", () => {
    cy.get("[data-bs-target='#loginModal']").click();
    
    cy.get("input[name='email']").type("sainath@gmail.com");
    cy.get("input[name='email']").clear(); // To avoid error with cypress while entering email's into field
    cy.get("input[name='email']").type("venkatakiranj@gmail.com");
    
    cy.get("input[name='password']").type("sainath");
    
    cy.get("[login-btn]").click();
    
    cy.url().should('contain', 'dashboard');

    auth.logout()
    localStorage.removeItem('localUsersToken');
  })

  it("Should Logout the User and clear token on clicking on the Logout Option", () => {
    cy.get("[data-bs-target='#loginModal']").click();
    
    cy.get("input[name='email']").type("sainath@gmail.com");
    cy.get("input[name='email']").clear(); // To avoid error with cypress while entering email's into field
    cy.get("input[name='email']").type("venkatakiranj@gmail.com");
    
    cy.get("input[name='password']").type("sainath");

    cy.get("[login-btn]").click();

    cy.url().should('contain', 'dashboard');

    cy.get("[profile-drpdwn]").click();
    cy.get("[logout-btn]").click();
    cy.url().should('contain', '/');

    cy.visit(targetUrl+"/dashboard")
    cy.url().should('not.contain', 'dashboard');
  })
})