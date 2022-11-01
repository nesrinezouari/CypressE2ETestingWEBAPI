export class ElementsPage  { 
   
 // check result length on result page
  ClickMenuElement(label)
    {


        cy.contains(label).should('be.visible').click();
        
    }


    ClickOnAddutton()
    {
cy.get("#addNewRecordButton").should('be.visible').click();
    }

    EditLineOnTable(Firstname)
    {

        cy.get('[role=row]')
  
  .within(() => {
    // we will edit Row with the same Firstname , next stage will focus on all data
    cy.get('[role=gridcell]').contains(Firstname).parent().find('[title=Edit]').click();
   
    
    
  })
        
    }

   CheckRowExit(FirstNamevalue,LasNamevalue)
   {

    cy.get('[role=row]')

.within(() => {
// we will edit Row with the same Firstname , next stage will focus on all data
cy.get('[role=gridcell]').contains(FirstNamevalue).parent().find('[role=gridcell]').contains(LasNamevalue);



})
}
}