import registrationPage from "../pages/registrationPage.spec"

describe("Registration tests", () => {

    const name = 'Michelle';
    const surname = 'Smith';
    const date = new Date().getTime();
    const pssw = 'Test.2022';

    beforeEach( () => {
        cy.visit('/register?returnUrl=%2F')
    });

    it('Register by filling all fields', () => {
        registrationPage.selectGender('M')
        registrationPage.typeFirstName(name)
        registrationPage.typeLastName(surname)
        registrationPage.selectDateOfBirthDay('12')
        registrationPage.selectDateOfBirthMonth('June')
        registrationPage.selectDateOfBirthYear('2000')
        registrationPage.typeEmail(`test${date}@gmail.com`)
        registrationPage.typeCompanyName('IDK')
        registrationPage.typePassword(pssw)
        registrationPage.typeConfirmationPassword(pssw)
        registrationPage.clickRegisterButton()
        registrationPage.resultShouldBeVisible()
    });

    it('Registered user cannot register again', () => {
        registrationPage.selectGender('F')
        registrationPage.typeFirstName(name)
        registrationPage.typeLastName(surname)
        registrationPage.selectDateOfBirthDay('22')
        registrationPage.selectDateOfBirthMonth('May')
        registrationPage.selectDateOfBirthYear('1998')
        registrationPage.typeEmail(`test${date}@gmail.com`)
        registrationPage.typeCompanyName('IDK')
        registrationPage.typePassword(pssw)
        registrationPage.typeConfirmationPassword(pssw)
        registrationPage.clickRegisterButton()
        registrationPage.getMainMessageError().should('include.text', 'The specified email already exists')
    });

    it('Register by filling only required fields', () => {
        registrationPage.typeFirstName(name)
        registrationPage.typeLastName(surname)
        registrationPage.typeEmail(`test.${date}@gmail.com`)
        registrationPage.typePassword(pssw)
        registrationPage.typeConfirmationPassword(pssw)
        registrationPage.clickRegisterButton()
        registrationPage.resultShouldBeVisible()
    });

    it('Register by not filling any data', () => {
        registrationPage.clickRegisterButton()
        registrationPage.uncheckNewsletter()
        registrationPage.firstNameErrorShouldBeVisible()
        registrationPage.lastNameErrorShouldBeVisible()
        registrationPage.getEmailError().should('have.text', 'Email is required.')
        registrationPage.getPasswordError().should('have.text', 'Password is required.')
        registrationPage.getConfirmPasswordError().should('have.text', 'Password is required.')
    });

    it('Email validation', () => {
        registrationPage.getInvalidEmails().forEach((email) => {
        registrationPage.typeEmail(email)
        registrationPage.clickRegisterButton()
        registrationPage.getEmailError().should('have.text', 'Wrong email')
    })
    });

    it('Password length limit validation', () => {
        registrationPage.typePassword('12345')
        registrationPage.typeConfirmationPassword('12345')
        registrationPage.clickRegisterButton()
        registrationPage.getPasswordError().should('include.text', 'must have at least 6 characters')

    });

    it('Passing different passwords', () => {
        registrationPage.typePassword('Test.1')
        registrationPage.typeConfirmationPassword('Test.2')
        registrationPage.clickRegisterButton()
        registrationPage.getConfirmPasswordError().should('have.text', 'The password and confirmation password do not match.')
    });

    it('Not passing confirmation password', () => {
        registrationPage.typePassword(pssw)
        registrationPage.clickRegisterButton()
        registrationPage.getConfirmPasswordError().should('have.text', 'Password is required.')
    });

})
