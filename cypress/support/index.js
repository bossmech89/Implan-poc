// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import '@4tw/cypress-drag-drop';


// Alternatively you can use CommonJS syntax:
// require('./commands')
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  });

  // X-path
  require('cypress-xpath');

  // export function drag(dragSelector, dropSelector) {
  //   // Based on this answer: https://stackoverflow.com/questions/55361499/how-to-implement-drag-and-drop-in-cypress-test
  //   cy.get(dragSelector).should('exist').get(dropSelector).should('exist');
  
  //   const draggable = Cypress.$(dragSelector)[0]; // Pick up this
  //   const droppable = Cypress.$(dropSelector)[0]; // Drop over this
  //   const coords = droppable.getBoundingClientRect();
  
  //   draggable.dispatchEvent(new MouseEvent('mousedown'));
  //   draggable.dispatchEvent(new MouseEvent('mousemove', {clientX: coords.left, clientY: coords.top}));
  //   draggable.dispatchEvent(new MouseEvent('mousemove', {clientX: coords.left + 40, clientY: coords.top + 10}));
  //   cy.wait(4000);
  //   // cy.get(dropSelector).click();
  //     draggable.dispatchEvent(new MouseEvent('mouseup'));
  
  //   return cy.get(dropSelector);
  // }
  
  // // Finally add the custom command
  // Cypress.Commands.add('drag', drag);
