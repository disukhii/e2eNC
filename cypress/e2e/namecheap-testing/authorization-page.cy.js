import utils from '../../support/namecheap-utils'
require('cypress-xpath');
const userData = Object.values(utils.user)
describe('Authorization page', () => {
    beforeEach(() => {
        // Open Home page
        cy.visit(`${utils.url}`)
        cy.log(`The home page has to be opened`)
    })
    it('Authorization page (Welcome back!)', () => {
        // Click on the "LOG IN" text
        /* On the authorization page enter a valid email and password for the previously registered user
        (to check the entered password, click on the `eye` icon in the password field.) */
        cy.authUser(utils.user.email, utils.user.password)

        // Click the "Login" button
        cy.get(`button[type="submit"]`).should('be.visible').click()
        cy.get(`[class="ssls-dropdown ssls-header-user ssls-header-dropdown"]`).contains(`${utils.user.email}`).click()
        cy.get(`[class="ssls-dropdown__holder ssls-dropdown__holder--toolbar"]`).should(`be.visible`).contains('Log out').click()
        cy.log(`The "Log in" button has to be changed to the "User@email" button (with the dropdown menu) from the left side in the Header of the page`)

        // afterAll() ->
        cy.get(`[class="page-title"]`).should('have.text', 'Authorization')
    })
    it('Authorization page. Not registered user', () => {
        /*  Click on the "LOG IN" text
        On the authorization page enter not registered email and any password */
        cy.authUser(utils.randomString(8, true), utils.randomString(8))

        // Click the "Login" button
        cy.get(`button[type="submit"]`).should('be.visible').click().wait(2000)
        cy.get(`[class="noty_text"]`).should('be.visible')
            .should('have.text',`${utils.errorPopups.incorrectEmailOrPassword}`)
    })
    it('Authorization page. Invalid email', () => {
        /*  Click on the "LOG IN" text
        On the authorization page enter an invalid email and valid password */
        cy.authUser(utils.randomString(8, false), utils.randomString(8))

        // Click the "Login" button
        cy.get(`button[type="submit"]`).should('be.visible').click().wait(2000)
        cy.get(`[class="form-group email"]`).should('be.visible')
            .contains(`${utils.errorPopups.notEmail}`)
    })
    it('My profile page. Client area', () => {
        // Log in to Account
        cy.authUser(utils.user.email, utils.user.password)

        // Click the "Login" button
        cy.get(`button[type="submit"]`).should('be.visible').click()
        cy.get(`[class="ssls-dropdown ssls-header-user ssls-header-dropdown"]`).contains(`${utils.user.email}`).click()

        // In the drop-down menu select "Profile"
        cy.get(`[class="ssls-dropdown__holder ssls-dropdown__holder--toolbar"]`)
            .should(`be.visible`).contains('Profile').click()
        cy.log(`After clicking on the "Profile" opened page "Profile" should be displayed`)

        // Check that opened page has to contain values in the next fields and compare them with values from precondition:
        // 2.1. Name
        // 2.2. Email
        // 2.3. Password (not empty)
        // 2.4. Phone
        // 2.5. Address
        // 2.6. Support pin
        // 2.7. Newsletter
        userData[2] = '*****'
        for(let i = 0; i < userData.length; i++){
            cy.xpath(`//div[@class='item'][${i+1}]`).should('be.visible').contains( `${userData[i]}`)
            cy.log(`${userData[i]} - exist`)
        }

        // afterAll() => Log out
        cy.get(`[class="ssls-dropdown ssls-header-user ssls-header-dropdown"]`).contains(`${utils.user.email}`).click()
        cy.get(`[class="ssls-dropdown__holder ssls-dropdown__holder--toolbar"]`).should(`be.visible`)
            .contains('Log out').click()
    })
})
