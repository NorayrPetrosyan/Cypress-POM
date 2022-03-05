import loginPage from "../pages/loginPage.spec"
import registrationPage from "../pages/registrationPage.spec"

describe("Login tests", () => {

    const date = new Date().getTime();
    const email = `test.${date}@gmail.com`;
    const pssw = 'Test.2022';
    const name = 'Michelle';
    const surname = 'Smith';
    
    beforeEach( () => {
        cy.visit('/login?returnUrl=%2F')
    });

    it('Creating user', () => {
        loginPage.clickRegisterButton()
        registrationPage.typeFirstName(name)
        registrationPage.typeLastName(surname)
        registrationPage.typeEmail(email)
        registrationPage.typePassword(pssw)
        registrationPage.typeConfirmationPassword(pssw)
        registrationPage.clickRegisterButton()
    });

    it('Log in with registered email', () => {
        loginPage.typeEmail(email)
        loginPage.typePassword(pssw)
        loginPage.clickLoginButton()
        loginPage.getCurrentPageURL().should('eq','https://demo.nopcommerce.com/')
    });

    it('Passing incorrect password', () => {
        loginPage.typeEmail(email)
        loginPage.typePassword('123456')
        loginPage.clickLoginButton()
        loginPage.getMessageError().should('include.text', 'The credentials provided are incorrect')
    });

    it('Passing wrong email', () => {
        loginPage.typeEmail('Gmail')
        loginPage.typePassword('123456')
        loginPage.clickLoginButton()
        loginPage.getEmailError().should('have.text', 'Wrong email')
    });

    it('Log in without filling any data', () => {
        loginPage.clickLoginButton()
        loginPage.getEmailError().should('have.text', 'Please enter your email')
    });

    it('Log in only passing email', () => {
        loginPage.typeEmail(email)
        loginPage.clickLoginButton()
        loginPage.getMessageError().should('include.text', 'Login was unsuccessful.')
    });

    it('Log in only passing password', () => {
        loginPage.typePassword(pssw)
        loginPage.clickLoginButton()
        loginPage.getEmailError().should('have.text', 'Please enter your email')
    });

})
