import utils from '../../support/namecheap-utils'

describe('Authorization page. Invalid email', () => {
    before(() => {
        // Open Home page
        cy.visit(`${utils.url}`)
        cy.log(`The home page has to be opened`)
    })
    it('Failed authorization of user who has invalid-email', () => {
        /*  Click on the "LOG IN" text
        On the authorization page enter an invalid email and valid password */
        cy.authUser(utils.randomString(8, false), utils.randomString(8))

        // Click the "Login" button
        cy.get(`button[type="submit"]`).should('be.visible').click().wait(2000)
        cy.get(`[class="form-group email"]`).should('be.visible')
            .contains(`${utils.errorPopups.notEmail}`)
    })
})

