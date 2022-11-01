/// <reference types="cypress" />

   
import { DemoQaHomePage } from "../page-objects/DemoQaHome-page"
import { ElementsPage } from "../page-objects/Elements-page";


const DemoQaHomePagec = new DemoQaHomePage();
const ElementsPagec = new ElementsPage();
const BrokenPagec = new BrokenPage();


const Elements= "Elements";
const Menu= "Broken Links - Images";

describe('Image',  ()  => {

  before(() => {
    // navigate to home page   
    DemoQaHomePagec.navigate();
        
     })
context ( 'Test suite DemoQa add and Update Element from Table', () => {
   
   
  Cypress.Commands.add('ClickOnTextLink',(Elementgs) =>{
    DemoQaHomePagec.ClickOnTextLink(Elementgs);

  })
  Cypress.Commands.add('ClickOnMenu',(Elementggs) =>{
    ElementsPagec.ClickMenuElement(Elementggs);

  }
  
  )
Cypress.Commands.add('CheckImage',() =>
{
  BrokenPagec.checkImage();
})
 
 
  
  
  
it ('Navigate to “Elements”', () => {
    
    cy.ClickOnTextLink(Elements);
})
it ('Click on Broken Link ', () => {
  // Click on Menu element
    cy.ClickOnMenu(Menu);
})
it ('Check first image is Broken ', () => {
  //Click on add button
  cy.CheckImage();

})



})
}) 
