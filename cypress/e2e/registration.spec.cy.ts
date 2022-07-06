import { AuthenticationsService } from "src/app/Services/authentications.service";

describe('User Authentication Tests', () => {
  let auth: AuthenticationsService;
  let targetUrl = 'http://localhost:4200/';

  beforeEach(()=>{
    auth = new AuthenticationsService();
    cy.visit(targetUrl);
  });

  it("Should check Register button disabled by default", () => {
    cy.get("[data-bs-target='#registerModal']").click();
    cy.get('[reg-button]').eq(0).should('be.disabled');
  })

  it("Should check Registration Details while registering", () => {
    cy.get("[data-bs-target='#registerModal']").click();

    cy.get("input[name='uname']").type("Sainath");
    cy.get("input[name='uname']").clear();
    cy.get("input[name='uname']").type("Sainath");
    cy.get("input[name='remail']").type("sainath@gmail.com");
    cy.get("input[name='phone']").type("9493660145");
    cy.get("input[name='npass']").type("sainath");
    cy.get("input[name='cpass']").type("sainath");
    cy.get('[reg-button]').eq(0).should('not.be.disabled');
  });

  it("should verify Username Field while registering", ()=>{
    cy.get("[data-bs-target='#registerModal']").click();
    cy.get("input[name='uname']").type("Sainath");
    cy.get("input[name='uname']").clear();
    cy.get("input[name='uname']").eq(0).should('have.class', 'is-invalid');
    cy.get("input[name='uname']").type("Sainath");
    cy.get("input[name='uname']").eq(0).should('have.class', 'is-valid');
  });

  it("should verify email address while registering", ()=>{
    cy.get("[data-bs-target='#registerModal']").click();
    cy.get("input[name='remail']").type("sainath@gmail.com");
    cy.get("input[name='remail']").clear();
    cy.get("input[name='remail']").should('have.class', 'is-invalid');
    cy.get("input[name='remail']").clear();
    cy.get("input[name='remail']").type("venkatakiran@gmail.c");
    cy.get("input[name='remail']").should('have.class', 'is-invalid');
    cy.get("input[name='remail']").clear();
    cy.get("input[name='remail']").type("venkatakiran@gmail.com");
    cy.get("input[name='remail']").should('have.class', 'is-valid');
  })

  it("should verify Phone number Field while registering", ()=>{
    cy.get("[data-bs-target='#registerModal']").click();
    cy.get("input[name='phone']").type("9493660145");
    cy.get("input[name='phone']").clear();
    cy.get("input[name='phone']").type("sainath");
    cy.get("input[name='phone']").eq(0).should('have.class', 'is-invalid');
    cy.get("input[name='phone']").clear();
    cy.get("input[name='phone']").eq(0).should('have.class', 'is-invalid');
    cy.get("input[name='phone']").type("9493660145");
    cy.get("input[name='phone']").eq(0).should('have.class', 'is-valid');
  })

  it("should verify Password field while registering", ()=>{
    cy.get("[data-bs-target='#registerModal']").click();
    cy.get("input[name='npass']").type("sainath");
    cy.get("input[name='npass']").eq(0).should('have.class', 'is-valid');
    cy.get("input[name='npass']").clear();
    cy.get("input[name='npass']").eq(0).should('have.class', 'is-invalid');
    cy.get("input[name='npass']").type("sainath");
    cy.get("input[name='npass']").eq(0).should('have.class', 'is-valid');
  })

  it("should verify Confirm Password field while registering", ()=>{
    cy.get("[data-bs-target='#registerModal']").click();
    cy.get("input[name='cpass']").type("sainath");
    cy.get("input[name='cpass']").eq(0).should('have.class', 'is-valid');
    cy.get("input[name='cpass']").clear();
    cy.get("input[name='cpass']").eq(0).should('have.class', 'is-invalid');
    cy.get("input[name='cpass']").type("sainath");
    cy.get("input[name='cpass']").eq(0).should('have.class', 'is-valid');
  })

  it("Should Display Duplicate Email Error if Re-registration with same email was attempted.", () => {
    cy.get("[data-bs-target='#registerModal']").click();
    cy.get('[reg-button]').eq(0).should('be.disabled');
    
    cy.get("input[name='uname']").type("Sainath");
    cy.get("input[name='uname']").clear();
    cy.get("input[name='uname']").type("Sainath");
    cy.get("input[name='remail']").type("sainath@gmail.com");
    cy.get("input[name='phone']").type("9493660145");
    cy.get("input[name='npass']").type("sainath");
    cy.get("input[name='cpass']").type("sainath");
    cy.get('[reg-button]').eq(0).should('not.be.disabled');
    cy.get('[reg-button]').click();

    cy.url().should("contain", 'dashboard');
    
    cy.get("[profile-drpdwn]").click();
    cy.get("[logout-btn]").click();
    cy.url().should("not.contain",'dashboard');

    cy.get("[data-bs-target='#registerModal']").click();
    
    cy.get("input[name='uname']").type("Sainath");
    cy.get("input[name='uname']").clear();
    cy.get("input[name='uname']").type("Sainath");
    cy.get("input[name='remail']").type("sainath@gmail.com");
    cy.get("input[name='phone']").type("9493660145");
    cy.get("input[name='npass']").type("sainath");
    cy.get("input[name='cpass']").type("sainath");
    cy.get('[reg-button]').eq(0).should('not.be.disabled');
    cy.get('[reg-button]').click();

    cy.get("[reg-alert]").should('have.text', " email already exists! ");
    
    localStorage.removeItem('localUsersToken');
  });

  it("Should verify New Password and Confirm Password are same while registering.", () => {
    cy.get("[data-bs-target='#registerModal']").click();
    cy.get('[reg-button]').eq(0).should('be.disabled');
    
    cy.get("input[name='uname']").type("Sainath");
    cy.get("input[name='uname']").clear();
    cy.get("input[name='uname']").type("Sainath");
    cy.get("input[name='remail']").type("sainath@gmail.com");
    cy.get("input[name='phone']").type("9493660145");
    cy.get("input[name='npass']").type("sainath");
    cy.get("input[name='cpass']").type("sairam");
    cy.get('[reg-button]').eq(0).should('not.be.disabled');
    cy.get('[reg-button]').click();

    cy.get("[reg-alert]").should('have.text', " Two Passwords didn't Match! ");
  });

  it("Should perform Registration after Form Validations and Login the registered User.", () => {
    cy.get("[data-bs-target='#registerModal']").click();
    cy.get('[reg-button]').eq(0).should('be.disabled');
    
    cy.get("input[name='uname']").type("Sainath");
    cy.get("input[name='uname']").clear();
    cy.get("input[name='uname']").type("Sainath");
    cy.get("input[name='remail']").type("sainath@gmail.com");
    cy.get("input[name='phone']").type("9493660145");
    cy.get("input[name='npass']").type("sainath");
    cy.get("input[name='cpass']").type("sainath");
    cy.get('[reg-button]').eq(0).should('not.be.disabled');
    cy.get('[reg-button]').click();

    cy.url().should("contain", 'dashboard');
  });
})