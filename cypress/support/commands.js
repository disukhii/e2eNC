
Cypress.Commands.add('authUser', (email, password) => {

    // Click on the "LOG IN" text
    cy.get(`[class="ssls-toolbar__btn-text"]`).contains("Log in").click()
    cy.log(`The authorization page has to be opened`)

    /* On the authorization page enter a valid email and password for the previously registered user
        (to check the entered password, click on the `eye` icon in the password field.) */
    cy.get(`input[type=email]`).should('be.visible').clear()
        .type(`${email}`).should('have.value', `${email}`)
    cy.get(`input[type=password]`).should('be.visible').clear()
        .type(`${password}`)
    cy.get(`[class="icon icon-eye"]`).should('be.visible').click()
    cy.get(`input[type=text]`).should('have.value', `${password}`)
    cy.log(`After clicking on the "eye" icon for the password field, the password should be displayed`)
})