let username = "implan111@gmail.com";
let password = "implan@123";
let specificationList = [];
let listValue;
let industrieslist;
const pageObj = require('./cypress/page_objects/implan.po.json')

export function visit() {
    cy.clearCookies({ domain: null });
    cy.visit("https://beta-app.implan.com");
    cy.wait(10000);
};

export function login() {
    // Enter the valid user mail id
    cy.get(pageObj.model_id.username_input).type(username);
    // Enter the valid password
    cy.get(pageObj.model_id.password_input).type(password);
    // Click the Login button
    cy.get(pageObj.model_id.login_button).click();
    cy.wait(4000);
};

// Login with Valid username and password
export function loginWithValidUsernameAndPassword() {
    cy.wait(3000);
    if (Cypress.$(".auth0-lock-last-login-pane").length) {
        cy.get(".auth0-lock-alternative .auth0-lock-alternative-link").click();
        login();
    } else {
        login();
    }
};

// Event Specification list
export function specificationLists() {
    cy.get(".MuiAutocomplete-popper .MuiAutocomplete-paper .MuiAutocomplete-listbox li").then(($elements) => {
        $elements.each((index, $list) => {
            if (index) {
                listValue = Number($list.innerText.split('-')[0].trim());
                specificationList.push(listValue);
            }
        });
        let sortedValues = specificationList;
        console.log(sortedValues);
        expect(specificationList).to.equal(sortedValues.sort((a, b) => { return a - b }));
    })
};

// Generate the combined region
export function generateCombinedRegion() {
    return cy.get(".MuiBox-root").then($element => {
        if (Cypress.$(".MuiBox-root .Mui-disabled").length > 0) {
            cy.wait(30000);
            return generateCombinedRegion();
        } else {
            return true;
        }
    })
};

// Generate random string 
export const combinedCountryName = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
};

// Unaggregated Industries list
export function unaggregatedIndustriesLists() {
    cy.get(".css-9nxabp .MuiTableContainer-root .css-v2kfba div[draggable='true']").then(($elements) => {
        $elements.each(($list) => {
            industrieslist = $list.length;
        });
    });
};
