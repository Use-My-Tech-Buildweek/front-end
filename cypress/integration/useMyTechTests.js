describe('Use-My-Tech app', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })

    it('checking Home button is here', () => {
        cy.get('[data-cy="homeButton"]')
            .should('exist')
            .click() 
    })
    it('checking search bar is here and functional', () => {
        cy.get('[data-cy="search_input"]')
            .type('search')
            .get('[data-cy="search_inputBar"]')
            .should('have.value', 'search')
    })
    it('Login button', () => {
        cy.get('[data-cy="logInButton"]')
            .should('exist')
            .click()
            cy.url().should('eq', 'http://localhost:3000/login')
    }),
    it('username field', () => {
        cy.get('[data-cy="logInButton"]')
            .should('exist')
            .click()
            .get('[data-cy="usernameField"]')
            .type("username")
            .should("have.value", "username")
    }),
    it('password field', () => {
        cy.get('[data-cy="logInButton"]')
            .should('exist')
            .click()
            .get('[data-cy="passwordField"]')
            .type("password")
            .should("have.value", "password")
    }),
    it('log in button', () => {
        cy.get('[data-cy="logInButton"]')
            .should('exist')
            .click()
            .get('[data-cy="loginFormButton"]')
    }),
    it('sign up link', () => {
        cy.get('[data-cy="logInButton"]')
            .should('exist')
            .click()
            .get('[data-cy="signUpLink"]')
            .click()
            .url().should('eq', 'http://localhost:3000/register')
    })
    it('sign up form: username field', () => {
        cy.get('[data-cy="logInButton"]')
            .should('exist')
            .click()
            .get('[data-cy="signUpLink"]')
            .click()
            .get('[data-cy="userNameLabelSignUp"]')
            .type('username')
            .get('[data-cy="userNameSignUp"]')
            .should("have.value", "username")     
    }),
    it('sign up form: password field', () => {
        cy.get('[data-cy="logInButton"]')
            .should('exist')
            .click()
            .get('[data-cy="signUpLink"]')
            .click()
            .get('[data-cy="passwordSignUp"]')
            .type('username')
            .should("have.value", "username")     
    }),
    it('sign up form: confirm password field', () => {
        cy.get('[data-cy="logInButton"]')
            .should('exist')
            .click()
            .get('[data-cy="signUpLink"]')
            .click()
            .get('[data-cy="confirmPasswordSignUp"]')
            .type('username')
            .should("have.value", "username")     
    }),
    it('sign up form: select field', () => {
        cy.get('[data-cy="logInButton"]')
            .should('exist')
            .click()
            .get('[data-cy="signUpLink"]')
            .click()
            .document()
            .should((doc) => {let sel = doc.getElementById('department')
                            sel.style.display = 'block'})
            .get('[data-cy="departmentSignUp"]')
            .select('renter')
            .should("have.value", "renter") 
            .document()
            .should((doc) => {let sel = doc.getElementById('department')
                            sel.style.display = 'none'})
    })
    it('sign up form: submit button field disabled', () => {
        cy.get('[data-cy="logInButton"]')
            .should('exist')
            .click()
            .get('[data-cy="signUpLink"]')
            .click()
            .get('[data-cy="submitButtonSignUp"]')
            .should('be.disabled')    
    }),
    it('sign up form: submit button field enabled', () => {
        cy.get('[data-cy="logInButton"]')
            .should('exist')
            .click()
            .get('[data-cy="signUpLink"]')
            .click()
            .get('[data-cy="confirmPasswordSignUp"]')
            .type('12345@Aa')
            .get('[data-cy="passwordSignUp"]')
            .type('12345@Aa')
            .get('[data-cy="userNameLabelSignUp"]')
            .type('username')
            .document()
            .should((doc) => {let sel = doc.getElementById('department')
                            sel.style.display = 'block'})
            .get('[data-cy="departmentSignUp"]')
            .select('renter')
            .get('[data-cy="submitButtonSignUp"]')
            .should('be.enabled')    
    })
    
})

