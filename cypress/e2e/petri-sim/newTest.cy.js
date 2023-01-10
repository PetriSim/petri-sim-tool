beforeEach(() => {

    cy.visit('http://localhost:3000')
    cy.findByText("Start new project").click()
    cy.findByText("Start parametrization").click()

})

describe('Delete Scenarios', () => {
    beforeEach(() => {
        cy.findByText("Simulation Overview").click({force: true})
    })
    it('finds a scenario and deletes it in overview', () => {
        //cy.findAllByRole('menuitem')
        cy.findAllByRole('tablist').findByText('Scenario 1').click()
        cy.findByText('Delete scenario').click()
        cy.findAllByRole('tablist').findByText('Scenario 1').should('not.exist')

    })

})