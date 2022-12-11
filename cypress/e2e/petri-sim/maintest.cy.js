describe('Change BPMN', () => {
    it('loads successfully', () => {
        cy.visit('http://localhost:3000')
        cy.findByText("Start new project").click()
        cy.findByText("Start parametrization").click()
        cy.visit('http://localhost:3000/modelbased')



        cy.findByRole('textbox', { name: /bpmn name/i }).should('have.attr', 'placeholder', "Warenversand")

        cy.findByRole('button', { name: /bpmn switcher/i }).click()

        cy.findByRole('menuitem', { name: /schufascoring 1/i }).click()

        cy.findByRole('textbox', { name: /bpmn name/i }).should('have.attr', 'placeholder', "Schufascoring")

    })
})