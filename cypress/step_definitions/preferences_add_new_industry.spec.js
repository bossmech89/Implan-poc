const common = require('../../common.js');
let newIndustryName;

describe("Add new industry in preferences", () => {
    it("I Login with valid username and password", () => {
        // Visit the URL
        common.visit();
        // Login with valid credentials
        common.loginWithValidUsernameAndPassword();
        cy.wait(4000);
    });

    it("Navigate to preferences page", () => {
        // Click the profile icon
        cy.get(".MuiToolbar-root .MuiIconButton-sizeSmall").eq(0).click();
        cy.wait(2000);
        // Click the preferences option
        cy.get(".MuiPaper-root .MuiListItemText-root .MuiTypography-displayBlock").eq(0).click();
    });

    it("Select industry scheme", () => {
        // Click the new custom scheme
        cy.wait(5000);
        cy.get("form button").eq(3).click();
        // Select industry scheme
        cy.get("#select-industry-scheme .MuiIconButton-label").first().click({force: true});
        // Click the continue button
        cy.get("button[form='select-industry-scheme']").click();
        cy.wait(5000);
    });

    it("Add new industry", () => {
        // Click the Add new industry button
        cy.get(".MuiPaper-root button .MuiButton-startIcon").click();
        cy.wait(2000);
        // Enter new industry name
        newIndustryName = common.combinedCountryName(5);
        cy.get("#name-industry input").type(newIndustryName);
        // Click the continue button
        cy.get(".MuiDialogActions-spacing button[form='name-industry']").click({force: true});
    });

    it("Validate the industry name", () => {
        cy.get(".MuiTableContainer-root .css-ejn9zg").first().invoke("text").should("eq", newIndustryName);
    })
});
