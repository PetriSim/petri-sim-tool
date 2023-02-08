beforeEach(() => {

    cy.visit('http://localhost:3000')
    cy.findByText("Start new project").click()
    cy.findByText("Start parametrization").click()
    cy.findByRole('textbox', { name: /projectname:/i }).type('testProject')
    cy.findByRole('button', { name: /save/i }).click()

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
describe('add and change scenario', () => {

    it('loads successfully', () => {

        cy.findByRole('link', { name: /add new scenario/i }).click()
        cy.findByRole('button', { name: /add scenario/i }).click()
        cy.findByText(/general parameters/i).click()
        cy.findByRole('textbox', { name: /scenario name:/i }).clear().type("Scenario 2")
        cy.findByRole('button', { name: /add scenario/i }).click()


        cy.visit('http://localhost:3000/modelbased')

        cy.findByRole('textbox', { name: /scenario name/i }).should('have.attr', 'placeholder', "Scenario 1")

        cy.findByRole('button', { name: /scenario switcher/i }).click()

        cy.findByRole('menuitem', { name: /Scenario 2/i }).click()

        cy.findByRole('textbox', { name: /scenario name/i }).should('have.attr', 'placeholder', "Scenario 2")

    })
})

describe('clicking through pages', () => {
    //TODO: make overview first page to show
    /*it('shows simulation overview page', () => {
         cy.url().should('eq', 'http://localhost:3000/overview')
         cy.findByRole('button', {name: /simulation overview/i}).click()
         cy.url().should('eq', 'http://localhost:3000/overview')
     })*/
    it('shows scenario parameters page', () => {
        cy.findByRole('button', { name: /scenario parameters/i }).click()
        cy.url().should('eq', 'http://localhost:3000/scenario')
    })
    it('shows resource parameters page', () => {
        cy.findByRole('button', { name: /resource parameters/i }).click()
        cy.url().should('eq', 'http://localhost:3000/resource')
    })
    it('shows model based parameters page', () => {
        cy.findByRole('button', { name: /modelbased parameters/i }).click()
        cy.url().should('eq', 'http://localhost:3000/modelbased')
    })
})

describe('Modelbased Parameters', () => {
    beforeEach(() => {
        cy.findByRole('button', { name: /modelbased parameters/i }).click()
    })
    it('changes the view', () => {
        cy.findByText("View").click()
        //cy.findByRole('link', { name: /table/i }).click()
        cy.findByText("Table").click()
        cy.url().should('eq', 'http://localhost:3000/modelbased/tableview')
        cy.findByText("View").click()
        cy.findByText("Model").click()
        cy.url().should('eq', 'http://localhost:3000/modelbased')
    })
})
describe('Modelbased Parameters: Table View', () => {
    beforeEach(() => {
        cy.findByRole('button', { name: /modelbased parameters/i }).click()
        cy.findByText("View").click()
        cy.findByText("Table").click()
    })
    it('changes to edit mode in table view', () => {
        cy.findAllByRole('textbox').eq(2).should('not.exist')
        cy.findByRole('button', { name: /edit mode/i }).click()
        cy.findAllByRole('textbox').eq(2).should('exist')
    })
    it('changes one numerical parameter in table view', () => {
        cy.findByText("42").should('not.exist')
        cy.findByRole('button', { name: /edit mode/i }).click()
        cy.findAllByRole('textbox').eq(2).clear().type('42')
        cy.findByRole('button', { name: /view mode/i }).click()
        cy.findByText("42").should('exist')
    })
    it('changes one dropdown parameter in table view', () => {
        cy.findByRole('button', { name: /edit mode/i }).click()
        cy.findByText("secs").should('not.exist')
        cy.findAllByRole('cell', { name: /minutes/i }).eq(0).click().findByRole('combobox').select('Seconds')
            //cy.findAllByRole('combobox').eq(0).findbyText('Seconds').click() //.
        cy.findByRole('button', { name: /view mode/i }).click()
        cy.findAllByText("secs").eq('0').should('exist')
        cy.findAllByText("secs").eq('1').should('not.exist')
    })
    it('changes to view mode in table view', () => {
        cy.findByRole('button', { name: /edit mode/i }).click()
        cy.findByRole('button', { name: /view mode/i }).click()
        cy.findAllByRole('textbox').eq(2).should('not.exist')
    })
    it('finds headings for activities, gateways, events', () => {
        cy.findByRole('heading', { name: /Activities/i })
        cy.findByRole('heading', { name: /Gateways/i })
        cy.findByRole('heading', { name: /Events/i })
    })
})


describe('Compare Scenarios', () => {
    beforeEach(() => {

        cy.findByRole('button', { name: /overview/i }).click()
    })
    it('shows a popup for "compare scenarios', () => {

        cy.findByText('Scenarios to compare').should('not.exist')
        cy.findByText('Compare scenarios').click()
        cy.findByText('Scenarios to compare').should('be.visible')

    })
})
describe('Compare Scenarios', () => {
    beforeEach(() => {

        cy.findByRole('button', {name: /overview/i}).click()
        cy.findByRole('link', { name: /add new scenario/i }).click()
        cy.findByRole('button', { name: /add scenario/i }).click()
        cy.findByText(/general parameters/i).click()
        cy.findByRole('textbox', { name: /scenario name:/i }).clear().type("Scenario 2")
        cy.findByRole('button', { name: /add scenario/i }).click()
        cy.findByText(/general parameters/i).click()
        cy.findByRole('textbox', { name: /scenario name:/i }).clear().type("Scenario 3")
        cy.findByRole('button', { name: /add scenario/i }).click()
    })
    it('shows a popup for "compare scenarios and loads compare page', () => {

        cy.findByRole('button', {name: /overview/i}).click()
        cy.findByText('Scenarios to compare').should('not.exist')

        cy.findByRole('textbox', { name: /scenario name/i }).should('have.attr', 'placeholder', "Scenario 1")
        cy.findByRole('button', { name: /compare scenarios/i }).click()
        cy.findByText('Scenarios to compare').should('be.visible')

        cy.findByRole('dialog', {name: /scenarios to compare/i}).within(($dialog) => {
            cy.findByText(/scenario 2/i).should('be.visible')
            cy.findByText(/scenario 3/i).should('be.visible')
            cy.findByText(/scenario 1/i).should('not.exist')
            cy.findAllByRole('checkbox').eq(0).should('not.be.checked')
            cy.findAllByRole('checkbox').eq(1).should('not.be.checked')
            cy.findAllByRole('checkbox').eq(0).check({force:true})
            cy.findAllByRole('checkbox').eq(0).should('be.checked')
            cy.findAllByRole('checkbox').eq(1).should('not.be.checked')
            cy.findByRole('link', { name: /compare/i }).click()
            cy.url().should('eq', 'http://localhost:3000/compare')
        })
    })
})