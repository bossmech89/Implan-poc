const common = require('../../common.js');
const pageObj = require("../page_objects/implan.po.json");
let countryName;
let randomNumber;
let randomNumberForRegion;
let californiaState = "California";

// Generate random number
randomNumber = (Math.floor(Math.random() * 10));
// Generate random number
randomNumberForRegion = (Math.floor(Math.random() * 20) + 11);

describe("Validate the combined two region", () => {
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
        // Select the states
        cy.get(pageObj.region_overview.nebraska_country).click({ force: true });
        cy.get(pageObj.region_overview.florida).click({ force: true });
    });

    it("Create the combine regions with states", () => {
        // Click the combine region icon
        cy.get(pageObj.combine_regions.combine_region_icon).first().click({ force: true });
        cy.wait(3000);
        // Click the combine region
        cy.get(pageObj.combine_regions.combine_region).click();
        // Enter the combined regions name
        countryName = common.combinedCountryName(5);
        cy.get(pageObj.combine_regions.country_name_input).type(countryName);
        cy.wait(2000);
        // Click the save button
        cy.get(pageObj.combine_regions.combine_region_save_button).eq(1).click({ force: true });
        cy.wait(5000);
        // Validate the In-active icon
        cy.get(pageObj.combine_regions.inactive_icon).eq(5).should("have.attr", "title", "Region is building")
        // Click the delete icon
        cy.get(pageObj.combine_regions.delete_icon).eq(3).click({ force: true });
    });

    it("Search region by counties", () => {
        // Click the map icon
        cy.get(pageObj.model_id.map_icon_one).eq(1).click({ force: true });
        cy.wait(2000);
        cy.get(pageObj.model_id.map_icon_two).eq(0).click({ force: true });
        cy.wait(4000);
        // Enter the state name
        cy.get(pageObj.model_id.search_input).type(californiaState);
        cy.wait(2000);
        cy.get(pageObj.model_id.search_autocomplete).eq(randomNumber).click({ force: true });
        cy.wait(3000);
        // Clear the state name
        cy.get(pageObj.model_id.search_input).clear({ force: true });
        // Enter the state name
        cy.get(pageObj.model_id.search_input).type(californiaState);
        cy.wait(2000);
        cy.get(pageObj.model_id.search_autocomplete).eq(randomNumberForRegion).click({ force: true });
    });

    it("Create the combine regions with counties", () => {
        // Click the combine region icon
        cy.get(pageObj.combine_regions.combine_region_icon).first().click({ force: true });
        cy.wait(3000);
        // Click the combine region
        cy.get(pageObj.combine_regions.combine_region).click();
        // Enter the combined regions name
        countryName = common.combinedCountryName(5);
        cy.get(pageObj.combine_regions.country_name_input).type(countryName);
        cy.wait(2000);
        // Click the save button
        cy.get(pageObj.combine_regions.combine_region_save_button).eq(1).click({ force: true });
        cy.wait(5000);
        // Validate the In-active icon
        cy.get(pageObj.combine_regions.inactive_icon).eq(5).should("have.attr", "title", "Region is building")
        // Click the delete icon
        cy.get(pageObj.combine_regions.delete_icon).eq(3).click({ force: true });
    });

    it("Search region by zip codes", () => {
        // Click the map icon
        cy.get(pageObj.model_id.map_icon_one).eq(1).click({ force: true });
        cy.wait(2000);
        cy.get(pageObj.model_id.map_icon_two).eq(0).click({ force: true });
        cy.wait(4000);
        // Enter the zipcode
        cy.get(pageObj.model_id.search_input).type("50");
        cy.wait(2000);
        cy.get(pageObj.model_id.search_autocomplete).eq(randomNumber).click({ force: true });
        cy.wait(3000);
        // Clear the zipcode
        cy.get(pageObj.model_id.search_input).clear({ force: true });
        // Enter the zipcode
        cy.get(pageObj.model_id.search_input).type("60");
        cy.wait(2000);
        cy.get(pageObj.model_id.search_autocomplete).eq(randomNumberForRegion).click({ force: true });
    });

    it("Create the combine regions with zip codes", () => {
        // Click the combine region icon
        cy.get(pageObj.combine_regions.combine_region_icon).first().click({ force: true });
        cy.wait(3000);
        // Click the combine region
        cy.get(pageObj.combine_regions.combine_region).click();
        // Enter the combined regions name
        countryName = common.combinedCountryName(5);
        cy.get(pageObj.combine_regions.country_name_input).type(countryName);
        cy.wait(2000);
        // Click the save button
        cy.get(pageObj.combine_regions.combine_region_save_button).eq(1).click({ force: true });
        cy.wait(5000);
        // Validate the In-active icon
        cy.get(pageObj.combine_regions.inactive_icon).eq(5).should("have.attr", "title", "Region is building")
        // Click the delete icon
        cy.get(pageObj.combine_regions.delete_icon).eq(3).click({ force: true });
    });
});
