import utils from '../../support/namecheap-utils'
describe('Authorization page (Welcome back!)', () => {
    before(() => {
        // Open Home page
        cy.visit(`${utils.url}`)
        cy.log(`The home page has to be opened`)
    })
    it('Successful authorization of an existing user', () => {
        // Click on the "LOG IN" text
        cy.get(`[class="ssls-toolbar__btn-text"]`).contains("Log in").click()
        cy.log(`The authorization page has to be opened`)

        /* On the authorization page enter a valid email and password for the previously registered user
        (to check the entered password, click on the `eye` icon in the password field.) */
        cy.get(`input[type=email]`).should('be.visible').clear()
            .type(`${utils.user.email}`).should('have.value', `${utils.user.email}`)
        cy.get(`input[type=password]`).should('be.visible').clear()
            .type(`${utils.user.password}`)
        cy.get(`[class="icon icon-eye"]`).should('be.visible').click()
        cy.get(`input[type=text]`).should('have.value', `${utils.user.password}`)
        cy.log(`After clicking on the "eye" icon for the password field, the password should be displayed`)

        // Click the "Login" button
        cy.get(`button[type="submit"]`).should('be.visible').click()
        cy.get(`[class="ssls-dropdown ssls-header-user ssls-header-dropdown"]`).contains(`${utils.user.email}`).click()
        cy.get(`[class="ssls-dropdown__holder ssls-dropdown__holder--toolbar"]`).should(`be.visible`).contains('Log out').click()
        cy.log(`The "Log in" button has to be changed to the "User@email" button (with the dropdown menu) from the left side in the Header of the page`)

        // afterAll() ->
        cy.get(`[class="page-title"]`).should('have.text', 'Authorization')
    })
})
