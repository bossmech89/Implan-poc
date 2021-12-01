const common = require('../../common.js');
const pageObj = require('../page_objects/implan.po.json');
let eventTitleName;

describe("Validate the specification selected event", () => {
    it("Login with the valid username and password", () => {
        // Visit the URL
        common.visit();
        common.loginWithValidUsernameAndPassword();
        cy.wait(4000);
    });

    it("Click the Impacts", () => {
        cy.get(pageObj.project_edit_filters.dashboard_impacts).eq(1).click({ force: true });
        cy.wait(7000);
    });

    it("Select the event type for Industry output", () => {
        // Click the profile icon
        cy.get(pageObj.model_id.profile_icon).eq(0).click();
        cy.wait(2000);
        // Click the preferences option
        cy.get(pageObj.edit_events.preferences_options).eq(0).click();
        cy.wait(3000);
        cy.go("back");
        cy.wait(5000);
        eventTitleName = common.combinedCountryName(5)
        cy.get(pageObj.edit_events.title_name_input).eq(0).type(eventTitleName);
        // Select the event type
        cy.get(pageObj.project_edit_filters.event_type).eq(0).click({ force: true });
        cy.wait(3000);
        cy.get(pageObj.project_edit_filters.event_type_autocomplete).eq(1).click();
        // Select the specification
        cy.wait(4000);
        cy.get(pageObj.project_edit_filters.event_specification).eq(1).click({force: true});
    });

    it("Validate the specification ascending order list for industry output", () => {
        cy.wait(3000);
        common.specificationLists();
    });
});
