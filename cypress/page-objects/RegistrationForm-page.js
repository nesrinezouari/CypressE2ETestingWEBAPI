
export class RegistrationFormPage  { 
    

    // one Method to handel all input filed based on id
    setInputElement(id,valued)
       {
        cy.get('#registration-form-modal').should('be.visible');

        cy.get(id).should('be.visible').clear().type(valued);
        
         
       }

       submitForm()
       {
        cy.get('button[type=submit]').click()

        
       }
    
   }
