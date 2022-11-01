export class DemoQaHomePage  { 
    navigate(){
        cy.visit('/');
        //accept cookies google
     
    }
    ClickOnTextLink(linktext)
    {   //search text on google
        cy.contains(linktext).click()
    }
   
}