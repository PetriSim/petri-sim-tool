// to test:
//  tests to check if parameters are changed,
//  right gateway etc. opens when clicked in BPMN,
//  resource parameters, timetable, organisational
//  export to scylla,
//  import event logs, BPMN
//  open existing project, save project
//  scenario: add, delete, compare
//  reset parameters,

beforeEach(() => {

    cy.visit('http://localhost:3000')
    cy.findByText("Start new project").click()
    cy.findByText("Start parametrization").click()

})

/*describe('Delete Scenarios', () => {  //TODO: test when implemented
    beforeEach(() => {
        cy.findByText("Simulation Overview").click({force: true})
    })
    it('finds a scenario and deletes it in overview', () => {
        //cy.findAllByRole('menuitem')
        cy.findAllByRole('tablist').findByText('Scenario 1').click()
        cy.findByText('Delete scenario').click()
        cy.findAllByRole('tablist').findByText('Scenario 1').should('not.exist')

    })
})*/

describe('Compare Scenarios', () => {
    beforeEach(() => {

        cy.findByRole('button', {name: /simulation overview/i}).click()
    })
    it('shows a popup for "compare scenarios', () => {

        cy.findByText('Scenarios to compare').should('not.exist')
        cy.findByText('Compare scenarios').click()
        cy.findByText('Scenarios to compare').should('be.visible')
        cy.findByRole('dialog', {name: /scenarios to compare/i}).within(($dialog) => {
            cy.findByText(/scenario 2/i).should('be.visible')
            cy.findByText(/scenario 1/i).should('be.visible')
            /*            cy.findAllByRole('checkbox').eq(0).within(($checkbox) => {
                            cy.should('not.be.checked')
                            cy.check({force:true})
                            cy.should('be.checked')
                        })*/
            cy.findAllByRole('checkbox').eq(0).should('not.be.checked')
            cy.findAllByRole('checkbox').eq(0).check({force:true})
            cy.findAllByRole('checkbox').eq(0).should('be.checked')
        })
        //cy.findAllByRole('dialog', {name: /scenarios to compare/i}).findAllByRole('checkbox').eq(0).check({force:true})
        //cy.findAllByRole('dialog', {name: /scenarios to compare/i}).findAllByRole('checkbox').eq(0).should('be.visible')
    })
})



