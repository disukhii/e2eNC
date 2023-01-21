import utils from '../../support/namecheap-utils'

describe('Authorization page. Not registered user', () => {
    before(() => {
        // Open Home page
        cy.visit(`${utils.url}`)
        cy.log(`The home page has to be opened`)
    })
    it('Failed authorization of non-existing user', () => {
        /*  Click on the "LOG IN" text
        On the authorization page enter not registered email and any password */
        cy.authUser(utils.randomString(8, true), utils.randomString(8))

        // Click the "Login" button
        cy.get(`button[type="submit"]`).should('be.visible').click().wait(2000)
        cy.get(`[class="noty_text"]`).should('be.visible')
            .should('have.text',`${utils.errorPopups.incorrectEmailOrPassword}`)
    })
})

