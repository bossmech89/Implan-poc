const common = require('../../common.js');
const pageObj = require("../page_objects/implan.po.json");
let regionName = "Test1";
let selectedRegionName;
let projectName;

describe("Validate the combine two region", () => {
    it("I Login with valid username and password", () => {
        // Visit the URL
        common.visit();
        // Login with valid credentials
        common.loginWithValidUsernameAndPassword();
        cy.wait(4000);
    });

    it("Click the regions on dashboard", () => {
        cy.get(pageObj.model_id.dashboard_regions).first().click({ force: true });
    });

    it("Search region by states", () => {
        cy.wait(10000);
        // Click the map icon
        cy.get(pageObj.model_id.map_icon_one).eq(1).click({ force: true });
        cy.wait(2000);
        cy.get(pageObj.model_id.map_icon_two).eq(0).click({ force: true });
        cy.wait(4000);
        // Enter the region name
        cy.get(pageObj.model_id.search_input).type(regionName);
        cy.wait(3000);
        cy.get(pageObj.model_id.search_autocomplete).eq(0).click({ force: true });
        cy.wait(6000);
    });

    it("Navigate to the create impact page", () => {
        selectedRegionName = Cypress.$(pageObj.create_impact.selected_region_name).text();
        // Click the create impact button
        cy.get(pageObj.create_impact.create_impact_button).last().click();
        // Enter the project name
        projectName = common.combinedCountryName(5);
        cy.get(pageObj.create_impact.project_name_input).type(projectName);
        // Click the save button
        cy.get(pageObj.create_impact.project_save_button).last().click();
    });

    it("Validate the project and region name on the impact page", () => {
        cy.get(pageObj.create_impact.created_project_name).eq(0).invoke("text").should("eq", projectName);
        // Validate the created region name
        cy.get(pageObj.create_impact.created_region_name).eq(4).then(($value) => {
            cy.log($value.text());
            expect($value.text()).should("have.value", selectedRegionName);
        })
    })
});
