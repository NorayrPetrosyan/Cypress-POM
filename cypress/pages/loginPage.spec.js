class loginPage {

    elements = {
        emailInput: () => cy.get('#Email'),
        passwordInput: () => cy.get('#Password'),
        loginButtonInput: () => cy.get('.button-1.login-button'),
        registerButtonInput: () => cy.get('.button-1.register-button'),
        emailErrorInput: () => cy.get('#Email-error'),
        messageErrorInput: () => cy.get('.message-error.validation-summary-errors'),

    }

    typeEmail(email) {
        this.elements.emailInput().clear().type(email)
    }

    typePassword(password) {
        this.elements.passwordInput().clear().type(password)
    }

    clickLoginButton() {
        this.elements.loginButtonInput().click()
    }

    clickRegisterButton() {
        this.elements.registerButtonInput().click()
    }

    getEmailError() {
        return this.elements.emailErrorInput()
    }

    getMessageError() {
        return this.elements.messageErrorInput()
    }

    getCurrentPageURL() {
        return cy.url()
    }
}

module.exports = new loginPage()
