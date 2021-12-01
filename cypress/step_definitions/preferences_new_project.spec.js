const common = require('../../common.js');
let projectName;

// Login
function login() {
    return cy.get(".auth0-lock-last-login-pane").then(($element) => {
        if (Cypress.$(".auth0-lock-last-login-pane").length) {
            cy.get(".auth0-lock-social-button").click();
        } else {
            return true;
        }
    })
};

describe("Validate the combined and customized model", () => {
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

    it("Create the New project", () => {
        // Click the new project button
        cy.wait(5000);
        cy.get("form > div div:nth-child(4) button").click({ force: true });
        cy.wait(3000);
        // Enter the new project name
        projectName = common.combinedCountryName(5);
        cy.get("#newProjectForm .MuiFormControl-root input[name='projectName']").type(projectName);
        // Select the industry set
        cy.get("#newProjectForm .MuiInputBase-root #industrySetId").click({ force: true });
        cy.wait(2000);
        cy.get(".MuiPopover-paper ul li").first().click();
        // Select the aggregation scheme
        cy.get("#mui-component-select-aggregationSchemeId").click({ force: true });
        cy.wait(2000);
        cy.get(".MuiPopover-paper ul li").first().click();
        // Select household set
        cy.get("#mui-component-select-householdSetId").click();
        cy.wait(2000);
        cy.get(".MuiPopover-paper ul li").first().click();
        // Click the create project button
        cy.get(".MuiDialogActions-root button").last().click();
        cy.wait(8000);
    });

    it("Validate the project name", () => {
        cy.wait(3000);
        // Click the Implan logo
        cy.get("a[data-testid='implan-logo']").click();
        cy.wait(2000)
        login();
        cy.wait(4000)
        // Click the projects on dashboard
        cy.get(".MuiContainer-root .MuiGrid-container .MuiGrid-root a").eq(2).click({ force: true });
        cy.wait(5000);
        cy.get(".MuiGrid-container .MuiGrid-item span").eq(4).invoke("text").should("eq", projectName);
    });
});
