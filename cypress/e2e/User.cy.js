// get unique ID to avoid existing User Excepttion
const uniqueSeed = Date.now().toString();
const getUniqueId = () => Cypress._.uniqueId(uniqueSeed);
let userid ;
let  username;


describe('User api',  ()  => {
  beforeEach (function () {
    cy.fixture('UserData.json').then(function (testdata) {
       this.testdata = testdata ;
       
    })
})
  context('Post /User',  ()=>
   {

// Bug on BeforeAll escalated to Cypress team
    
      it('should Add User and Store Response', function ()  {
        
          cy.request({
              method: 'Post',
              url: 'https://bookstore.toolsqa.com/Account/v1/User',
              body: {
                "userName": this.testdata.userName + getUniqueId(),
                "password": this.testdata.password
              }
          }).then(response => {
            cy.log('Check Status code 201');
            expect(response.status).to.eq(201);
            //cy.log('Load Response to Fixture File');
    
           // cy.writeFile('cypress/fixtures/Dataresponse.json', response.body);
           cy.log ()
            const respBody = response.body;
                userid = respBody['userID'];
                username= respBody['username'];
               

                cy.log ('Hey User ' + username +':'  + userid + 'has been created succefully !' )
            cy.log('Fixture written to disk' );
          })
      })
      it('Shloud not add Existing User', function ()  {
       
        cy.request({
            method: 'Post',
            url: 'https://bookstore.toolsqa.com/Account/v1/User',
           // to avoid failure because Status Code <> from 2XX and 3XX
            failOnStatusCode: false ,
            body: {
              "userName": username ,
              "password": this.testdata.password
            }
        }).then(response => {
          cy.log('Check Status code 406 , Existing User' + response.status);
         
          expect(response.status).to.eq(406);
          
        })
      })

        it('Shloud not Add user with Invalid Password ', function ()  {
       
          cy.request({
              method: 'Post',
              url: 'https://bookstore.toolsqa.com/Account/v1/User',
              failOnStatusCode: false ,
              body: {
                "userName": this.testdata.userName ,
                "password": this.testdata.passwordinvalid
              }
          }).then(response => {

            cy.log('Check Status code 400 , bad request');
            expect(response.status).to.eq(400);
            
          })
        })


      })
      context('Post /token',  ()=>
   {
    it('Generate Token KO', function ()  {
           
      cy.request({
          method: 'Post',
          url: 'https://demoqa.com/Account/v1/GenerateToken',
          failOnStatusCode: false,
          body: {
            "userName": this.testdata.userName,
            "password": this.testdata.passwordinvalid
          }
      }).then(response => {
        cy.log('Check Status code 200 and Error Message');
        expect(response.status).to.eq(200);
        cy.log('Load Response to Fixture File');

        cy.writeFile('cypress/fixtures/Token2.json', response.body);
        const respBody = response.body;
       const resultmsg = respBody['result'];
        expect(resultmsg).to.eq("User authorization failed.");

       
      })
    
    }) 
    
          it('Generate Token', function ()  {
           
              cy.request({
                  method: 'Post',
                  url: 'https://demoqa.com/Account/v1/GenerateToken',
                  body: {
                    "userName": username,
                    
                    "password": this.testdata.password
                  }
              }).then(response => {
                cy.log('Check Status code 200');
                expect(response.status).to.eq(200);
                cy.log('Load Response to Fixture File');
        
                cy.writeFile('cypress/fixtures/Token.json', response.body);
                const respBody = response.body;
                Cypress.env('authorization',  respBody['token']);
              })
            
            }) })
            context('Post /Book',  ()=>
   {
            
         
          it('Add books ko invalid ibns  ', function ()  {
            const token = Cypress.env('authorization');
            const Authorization = 'Bearer ' + token;
            
        
        
            cy.log("Authorization header value :" + Authorization);
            cy.log("userid: " + userid );
            const options = {
              method: 'Post',
              url: 'https://demoqa.com/BookStore/v1/Books',
              headers: {
               authorization : Authorization
              },
              failOnStatusCode: false,
              body: {
                "userId": userid,
                "collectionOfIsbns": [
                  {
                    "isbn": "string"
                  }
                  
              
                ]
              }
            }
          cy.request(
         
          options).
            
            
            then(response => {
              cy.log('Check Status code 400');
              expect(response.status).to.eq(400);
              const respBody = response.body;
              const code = respBody['code'];
              expect(code).to.eq("1205");
              
          })
          })
          it('Add books OK ', function ()  {
            const token = Cypress.env('authorization');
            const Authorization = 'Bearer ' + token;
            
        
        
            cy.log("Authorization header value :" + Authorization);
            cy.log("userid: " + userid );
            const options = {
              method: 'Post',
              url: 'https://demoqa.com/BookStore/v1/Books',
              headers: {
               authorization : Authorization
              },
              body: {
                "userId": userid,
                "collectionOfIsbns": [
                  {
                    "isbn": this.testdata.isbn1
                  },
                  {
                    "isbn": this.testdata.isbn2
                  }
              
                ]
              }
            }
          cy.request(
         
          options).
            
            
            then(response => {
              cy.log('Check Status code 201');
              expect(response.status).to.eq(201);
              cy.log(response.body);
          })
          })
        

         
          // delete one created Book
              it('should Delete Added Book ', function()  {
                
                const token = Cypress.env('authorization');
            const Authorization = 'Bearer ' + token;
            
        
        
            cy.log("Authorization header value :" + Authorization);
            cy.log("userid: " + userid );
            const options = {
              method: 'DELETE',
              url: 'https://demoqa.com/BookStore/v1/Book',
           
              headers: {
               authorization : Authorization
              },
            //failOnStatusCode: false,
            body: 
            {
              
              "isbn": this.testdata.isbn1,
              "userId": userid
            
          }
          
            }
          cy.request(options).
            
            
            then(response => {
              cy.log('Check Status code 204');
              expect(response.status).to.eq(204);
           
              
          })
          })
   
  
          it('Delete non attached Book ', function()  {
                
            const token = Cypress.env('authorization');
        const Authorization = 'Bearer ' + token;
        
    
    
        cy.log("Authorization header value :" + Authorization);
        cy.log("userid: " + userid );
        const options = {
          method: 'DELETE',
          url: 'https://demoqa.com/BookStore/v1/Book',
       
          headers: {
           authorization : Authorization
          },
        failOnStatusCode: false,
        body: 
        {
          
          "isbn": this.testdata.isbn1,
          "userId": userid
        
      }
      
        }
      cy.request(options).
        
        
        then(response => {
          cy.log('Check Status code 400');
          expect(response.status).to.eq(400);
       
          
      })
      })


 
  })


})
