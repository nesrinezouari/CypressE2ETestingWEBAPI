/// <reference types="cypress" />
import signUpData from '../fixtures/FormData.json'
   
import { DemoQaHomePage } from "../page-objects/DemoQaHome-page"
import { ElementsPage } from "../page-objects/Elements-page";
import { RegistrationFormPage } from "../page-objects/RegistrationForm-page";

const DemoQaHomePagec = new DemoQaHomePage();
const ElementsPagec = new ElementsPage();
const RegistrationFormPagec = new RegistrationFormPage();
const Elements= "Elements";
const Menu= "Web Tables";

describe('User api',  ()  => {

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

  Cypress.Commands.add('Add',(Elementgs) =>{
    ElementsPagec.ClickOnAddutton();

  }
  )
  Cypress.Commands.add('EnterFirstName',(Firstname) =>{
    RegistrationFormPagec.setInputElement(signUpData.FirstNameId,Firstname);

  }
  
  )
  Cypress.Commands.add('EnterLastName',(Lastname) =>{
    RegistrationFormPagec.setInputElement(signUpData.LastNameId,Lastname);

  }
  
  )
  Cypress.Commands.add('EnterEmailtName',(email) =>{
    RegistrationFormPagec.setInputElement(signUpData.UserEmailid,email);

  }
  )

  Cypress.Commands.add('EnterEmail',(email) =>{
    RegistrationFormPagec.setInputElement(signUpData.UserEmailid,email);

  }
  
  )
  Cypress.Commands.add('EnterAge',(age) =>{
    RegistrationFormPagec.setInputElement(signUpData.UserAgeid,age);

  })
  Cypress.Commands.add('EnterSalary',(salary) =>{
    RegistrationFormPagec.setInputElement(signUpData.UserSalaryid,salary);

  }
  )
  Cypress.Commands.add('EnterDepartement',(dept) =>{
    RegistrationFormPagec.setInputElement(signUpData.UserDepartementid,dept);

  }
  )
  Cypress.Commands.add('SubmitForm',() =>{
    RegistrationFormPagec.submitForm();

  }
  )
  Cypress.Commands.add('EditLineOnTable',(FirstNamevalue,LastNamevalue,UserEmailvalue,UserAgevalue)=>{
    ElementsPagec.EditLineOnTable(FirstNamevalue);
  }
  )
  Cypress.Commands.add('CheckRowExist',(FirstNamevalue,LastNamevalue)=>{
    ElementsPagec.CheckRowExit(FirstNamevalue,LastNamevalue);
  }
  )
it ('Navigate to “Elements”', () => {
    
    cy.ClickOnTextLink(Elements);
})
it ('Click on “Web Tables”', () => {
  // Click on Menu element
    cy.ClickOnMenu(Menu);
})
it ('Click on “Add” button', () => {
  //Click on add button
  cy.Add();
})
it ('Register new Row and verify row appeared on table', () => {
    cy.EnterFirstName(signUpData.FirstNamevalue);
    cy.EnterLastName(signUpData.LastNamevalue);
  
    cy.EnterEmail(signUpData.UserEmailvalue);
    cy.EnterAge(signUpData.UserAgevalue);
    cy.EnterSalary(signUpData.UserSalaryvalue);
   
    cy.EnterDepartement(signUpData.UserDepartementvalue);
    cy.SubmitForm();
    cy.CheckRowExist(signUpData.FirstNamevalue,signUpData.LastNamevalue);
})

it ('Edit Created Row and verify Update', () => {
cy.EditLineOnTable(signUpData.FirstNamevalue);
cy.EnterFirstName("Gerimedica");
cy.EnterLastName("BV");
cy.SubmitForm();
cy.CheckRowExist("Gerimedica","BV");
})
})
}) 
