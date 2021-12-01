const common = require('../../common.js');
const pageObj = require('../page_objects/implan.po.json');
let projectName;
let projectNameList;
let eventTitleName;
let eventValue;

describe("Edit filters in Project", () => {
    it("Login with the valid username and password", () => {
        // Visit the URL
        common.visit();
        // Login with valid credentials
        common.loginWithValidUsernameAndPassword();
        cy.wait(4000);
    });

    it("Click the Project's on dashboard", () => {
        cy.get(pageObj.edit_events.dashboard_regions).eq(2).click({ force: true });
        cy.wait(7000);
        // Click the profile icon
        cy.get(pageObj.model_id.profile_icon).eq(0).click();
        cy.wait(2000);
        // Click the preferences option
        cy.get(pageObj.edit_events.preferences_options).eq(0).click();
        cy.wait(2000);
        // Click the project
        cy.go("back");
    });

    it("Validate the project name", () => {
        cy.wait(8000);
        cy.get("#projects > div:nth-child(2) > div > div").then(($element) => {
            // Store the project name
            projectName = Cypress.$(pageObj.edit_events.project_name).eq(0).text();
            // Iterate the project list
            cy.get("#projects > div:nth-child(2) > div > div .MuiGrid-container").each(($row) => {
                projectNameList = Cypress.$($row).find("div:nth-child(1) span").text()
                if (projectNameList === projectName) {
                    cy.get(pageObj.edit_events.project_flash_icon).eq(0).click({ force: true });
                    cy.wait(4000);
                }
            });
        });
    });

    it("Edit the event details", () => {
        // Click the profile icon
        cy.get(pageObj.model_id.profile_icon).eq(0).click();
        cy.wait(2000);
        // Click the preferences option
        cy.get(pageObj.edit_events.preferences_options).eq(0).click();
        cy.wait(3000);
        cy.go("back");
        cy.wait(3000);
        eventTitleName = common.combinedCountryName(5)
        cy.get(pageObj.edit_events.title_name_input).eq(0).clear();
        // Enter the Title name
        cy.get(pageObj.edit_events.title_name_input).eq(0).type(eventTitleName);
        // Enter the Value
        cy.get(pageObj.edit_events.event_value).eq(3).clear();
        eventValue = "2";
        cy.get(pageObj.edit_events.event_value).eq(3).type(eventValue, { force: true });
        cy.wait(3000);
    });

    it("Validate the event details in group event", () => {
        // Click the drop down button
        cy.get(pageObj.edit_events.group_event_drop_down_button).click({ force: true });
        // Validate the title name
        cy.get(pageObj.edit_events.group_event_title_name).invoke("text").should("eq", eventTitleName);
    })
});
