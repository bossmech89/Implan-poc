const common = require('../../common.js');
let newIndustryName;
let droppedListLength;
let draggedIndustrieslist = [];

describe("Validate aggregated and unaggregated industries in preferences", () => {
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
        cy.get(".MuiPaper-root .MuiListItemText-root .MuiTypography-displayBlock").eq(0).click({ force: true });
    });

    it("Select industry scheme", () => {
        // Click the preferences option and new custom scheme
        cy.wait(10000);
        cy.get("form button").eq(3).click({ force: true });
        cy.wait(3000);
        // Select industry scheme
        cy.get("#select-industry-scheme .MuiIconButton-label").first().click({ force: true });
        // Click the continue button
        cy.get("button[form='select-industry-scheme']").click({ force: true });
        cy.wait(5000);
    });

    it("Add new industry", () => {
        // Click the Add new industry button
        cy.get(".MuiPaper-root button .MuiButton-startIcon").click({ force: true });
        cy.wait(2000);
        // Enter new industry name
        newIndustryName = common.combinedCountryName(5);
        cy.get("#name-industry input").type(newIndustryName);
        // Click the continue button
        cy.get(".MuiDialogActions-spacing button[form='name-industry']").click({ force: true });
    });

    it("Drag and drop the unaggregated industry to aggregated industry", () => {
        cy.wait(4000);
        const draggedIndustrieslist = Cypress.$(".css-9nxabp .MuiTableContainer-root .css-v2kfba div[draggable='true'] > :nth-child(1)").length;
        cy.log(draggedIndustrieslist);
        cy.wait(3000);
        cy.get(".css-9nxabp .MuiTableContainer-root .css-v2kfba div[draggable='true']").first().drag(".css-10rxdqi .MuiTableContainer-root .css-v2kfba div[draggable='true']");
        cy.get(".css-9nxabp .MuiTableContainer-root .css-v2kfba div[draggable='true']").eq(1).drag(".css-10rxdqi .MuiTableContainer-root .css-v2kfba div[draggable='true']");
        // Aggregated dropped list
        droppedListLength = Cypress.$(".css-10rxdqi .MuiTableContainer-root .css-v2kfba div[draggable='true']").length;
        const industriesLength = draggedIndustrieslist - droppedListLength;
        console.log(industriesLength);
        cy.get(".css-9nxabp .MuiTableContainer-root .css-v2kfba div[draggable='true']").should("have.length", industriesLength + 1);
    })
});
