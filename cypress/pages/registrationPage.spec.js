class registrationPage {

    elements = {
        genderMaleInput: () => cy.get('#gender-male'),
        genderFemaleInput: () => cy.get('#gender-female'),
        firstNameInput: () => cy.get('#FirstName'),
        lastNameInput: () => cy.get('#LastName'),
        dateOfBirthDayInput: () => cy.get('[name="DateOfBirthDay"]'),
        dateOfBirthMonthInput: () => cy.get('[name="DateOfBirthMonth"]'),
        dateOfBirthYearInput: () => cy.get('[name="DateOfBirthYear"]'),
        emailInput: () => cy.get('#Email'),
        companyNameInput: () => cy.get('#Company'),
        newsletterInput: () => cy.get('#Newsletter'),
        passwordInput: () => cy.get('#Password'),
        confirmationPasswordInput: () => cy.get('#ConfirmPassword'),
        registerInput: () => cy.get('#register-button'),
        resultInput: () => cy.get('.result'),
        messageErrorInput: () => cy.get('.message-error.validation-summary-errors'),
        firstNameErrorInput: () => cy.get('#FirstName-error'),
        lastNameErrorInput: () => cy.get('#LastName-error'),
        emailErrorInput: () => cy.get('#Email-error'),
        passwordErrorInput: () => cy.get('#Password-error'),
        confirmPasswordErrorInput: () => cy.get('#ConfirmPassword-error'),
    }

    selectGender(gender) {

        switch (gender) {
            case "M":
                this.elements.genderMaleInput().check(gender);
                break;
            case "F":
                this.elements.genderFemaleInput().check(gender);
                break;
          }
    }

    typeFirstName(firstName) {
        this.elements.firstNameInput().clear().type(firstName)
    }

    typeLastName(lastName) {
        this.elements.lastNameInput().clear().type(lastName)
    }

    selectDateOfBirthDay(day) {
        this.elements.dateOfBirthDayInput().select(day)
    }

    selectDateOfBirthMonth(month) {
        this.elements.dateOfBirthMonthInput().select(month)
    }

    selectDateOfBirthYear(year) {
        this.elements.dateOfBirthYearInput().select(year)
    }

    typeEmail(email) {
        this.elements.emailInput().clear().type(email)
    }

    typeCompanyName(companyName) {
        this.elements.companyNameInput().clear().type(companyName)
    }

    uncheckNewsletter() {
        this.elements.newsletterInput().uncheck()
    }

    typePassword(password) {
        this.elements.passwordInput().clear().type(password)
    }

    typeConfirmationPassword(confirmationPassword) {
        this.elements.confirmationPasswordInput().clear().type(confirmationPassword)
    }

    clickRegisterButton() {
        this.elements.registerInput().click()
    }

    firstNameErrorShouldBeVisible() {
        this.elements.firstNameErrorInput().should('be.visible')
    }

    lastNameErrorShouldBeVisible() {
        this.elements.lastNameErrorInput().should('be.visible')
    }

    resultShouldBeVisible() {
        this.elements.resultInput().should('be.visible')
    }

    getInvalidEmails() {
        const date = new Date().getTime();
        const emails = [
            `test${date}@gmail..com`,
            `test${date}@gmail.`,
            `test${date}@.com`,
            `test${date}@`, 
            `test${date}@gmail`,
            `test${date}gmail.com`,
        ]
        return emails
    }

    getMainMessageError() {
        return this.elements.messageErrorInput()
    }

    getConfirmPasswordError() {
        return this.elements.confirmPasswordErrorInput()
    }

    getEmailError() {
        return this.elements.emailErrorInput()
    }

    getPasswordError() {
        return this.elements.passwordErrorInput()
    }

}

module.exports = new registrationPage()
