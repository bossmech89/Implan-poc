const common = require('../../common.js');
const pageObj = require('../page_objects/implan.po.json');

function buildProject() {
    return cy.get(".MuiList-root").then($element => {
        if (Cypress.$(pageObj.project_edit_filters.region_generating_icon).length > 0) {
            cy.wait(30000);
            return buildProject();
        } else {
            return true;
        }
    })
};

describe("Edit filters in Project", () => {
    it("Login with the valid username and password", () => {
        // Visit the URL
        common.visit();
        // Login with valid credentials
        common.loginWithValidUsernameAndPassword();
        cy.wait(4000);
    });

    it("Click the Impacts", () => {
        cy.get(pageObj.project_edit_filters.dashboard_impacts).eq(1).click({ force: true });
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

    it("Enter the events details", () => {
        cy.wait(5000);
        const eventTitleName = common.combinedCountryName(5);
        cy.get(pageObj.edit_events.title_name_input).eq(0).type(eventTitleName);
        // Select the event type
        cy.get(pageObj.project_edit_filters.event_type).eq(0).click({ force: true });
        cy.wait(3000);
        cy.get(pageObj.project_edit_filters.event_type_autocomplete).eq(1).click();
        // Select the specification
        cy.wait(5000);
        cy.get(pageObj.project_edit_filters.event_specification).eq(1).click({force: true});
        cy.wait(3000);
        cy.get(pageObj.project_edit_filters.event_specification_autocomplete).eq(2).click({force: true});
        // Enter the Value
        cy.get(pageObj.project_edit_filters.project_event_value).eq(3).type("1", { force: true });
        cy.wait(3000);
        cy.get(pageObj.project_edit_filters.event_drag_item).drag(pageObj.project_edit_filters.event_drop_item);
    });

    it("Enter the group details", () => {
        // Enter the group title
        cy.get(pageObj.project_edit_filters.group_title).eq(0).type("Testing1");
        // Enter the value
        cy.get(pageObj.project_edit_filters.project_event_value).eq(4).type("2");
        // Select region
        cy.get(pageObj.project_edit_filters.project_event_value).eq(7).click({ force: true });
        cy.wait(2000);
        cy.get(pageObj.project_edit_filters.group_region_autocomplete).eq(1).click();
        // Click the Run button
        cy.get(pageObj.project_edit_filters.group_run_button).eq(3).click({ force: true });
    });

    it("Enter the new project name", () => {
        const projectName = common.combinedCountryName(5);
        cy.get(pageObj.project_edit_filters.project_name_input).type(projectName);
        // Click the Save button
        cy.get().eq(1).click({ force: true });
        // Build the Project
        buildProject();
    })
});
