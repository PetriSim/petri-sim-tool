
beforeEach(() => {

    cy.visit('http://localhost:3000')
    cy.findByText("Start new project").click()
    cy.findByText("Start parametrization").click()

})


describe('Change BPMN', () => {
    it('loads successfully', () => {


        cy.visit('http://localhost:3000/modelbased')



        cy.findByRole('textbox', { name: /bpmn name/i }).should('have.attr', 'placeholder', "Warenversand")

        cy.findByRole('button', { name: /bpmn switcher/i }).click()

        cy.findByRole('menuitem', { name: /schufascoring 1/i }).click()

        cy.findByRole('textbox', { name: /bpmn name/i }).should('have.attr', 'placeholder', "Schufascoring")

    })
})
describe('Change scenario', () => {
    it('loads successfully', () => {


        cy.visit('http://localhost:3000/modelbased')



        cy.findByRole('textbox', { name: /scenario name/i }).should('have.attr', 'placeholder', "Scenario 1")
            //TODO: this element does not have a name yet-->cannot be found like this

        cy.findByRole('button', { name: /scenario switcher/i }).click()

        cy.findByRole('menuitem', { name: /Scenario 2/i }).click()

        cy.findByRole('textbox', { name: /scenario name/i }).should('have.attr', 'placeholder', "Scenario 2")

    })
})

describe('clicking through pages', () => {

   it('shows simulation overview page', () => {

        cy.url().should('eq', 'http://localhost:3000/overview')
        cy.findByText("Simulation Overview").click({force: true})   // TODO: renaming necessary
        cy.url().should('eq', 'http://localhost:3000/overview')
    })
    it('shows scenario parameters page', () => {
        cy.findByText("Scenario Parameters").click({force: true})
        cy.url().should('eq', 'http://localhost:3000/scenario')
    })
    it('shows resource parameters page', () => {
        cy.findByText("Resource Parameters").click({force: true})
        cy.url().should('eq', 'http://localhost:3000/resource')
    })
    it('shows model based parameters page', () => {
        cy.findByText("Modelbased Parameters").click({force: true})
        cy.url().should('eq', 'http://localhost:3000/modelbased')
    })
})

describe('Modelbased Parameters', () => {
    beforeEach(() => {
        cy.findByText("Modelbased Parameters").click({force: true})
    })
    it('changes the view of model based parameters', () => {
        cy.findByText("View").click()
        cy.findByText("Table").click()
        cy.url().should('eq', 'http://localhost:3000/modelbased/tableview')
        cy.findByText("View").click()
        cy.findByText("Model").click()
        cy.url().should('eq', 'http://localhost:3000/modelbased')
    })
    it('changes the model based parameters in table view', () => {
        cy.findByText("View").click()
        cy.findByText("Table").click()
        cy.findByRole('textbox', /*{ name: /bpmn switcher/i }*/).click()
    })
})

// TODO: tests to check if parameters are changed,
//  right gateway opens when clicked in BPMN,
//  resource parameters, timetable, organisational
//  export to scylla,
//  import event logs, BPMN
//  open ex project, save project
//  scenario: add, delete, compare
//  reset parameters,

//
describe('Compare Scenarios', () => {
    beforeEach(() => {

        cy.findByText("Scenario Overview").click({force: true}) //TODO replace with 'simulation'
    })
    it('shows a popup for "compare scenarios', () => {

        cy.findByText('Scenarios to compare').should('not.exist')
        cy.findByText('Compare scenarious').click() // TODO: replace with scenarios
        cy.findByText('Scenarious to compare').should('be.visible')  // TODO: replace with scenarios

    })
})

