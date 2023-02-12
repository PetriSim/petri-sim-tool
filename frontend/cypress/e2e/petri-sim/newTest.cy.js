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
    cy.findByRole('textbox', { name: /projectname:/i }).type('testProject')
    cy.findByRole('button', { name: /save/i }).click()

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





