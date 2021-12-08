const common = require('../../common.js');
const pageObj = require("../page_objects/implan.po.json");
let selectedCountryName = "Kansas";
let employmentTitle;
let employmentValue;
let output;
let outputValue;
let value;
let valueAdded;
let dateYear;
let year;

describe("Validate the Region overview page", () => {
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

    it("Search region by state", () => {
        cy.wait(5000);
        // Click the map icon
        cy.get(pageObj.model_id.map_icon_one).eq(1).click({ force: true });
        cy.wait(2000);
        cy.get(pageObj.model_id.map_icon_two).eq(0).click({ force: true });
        cy.wait(4000);
        // Select the countries
        cy.get(pageObj.region_overview.kansas_country).click({ force: true });
    });

    it("Validate the country details", () => {
        // Validate the country name
        cy.get(pageObj.region_overview.selected_country_name).invoke("text").should("eq", selectedCountryName);
        // Validate the employment
        cy.get(pageObj.region_overview.selected_country_employment).first().then(($element) => {
            employmentTitle = $element.text().split(':')[0].trim();
            employmentValue = $element.text().split(':')[1].replace(/[A-z,a-z,'\']/g, '');
        });
        // Validate the Output
        cy.get(pageObj.region_overview.selected_country_employment).eq(1).then(($element) => {
            output = $element.text().split(':')[0].trim();
            outputValue = $element.text().split(':')[1].replace(/[A-z,a-z,$'\']/g, '');
        });
        // Validate the Value added
        cy.get(pageObj.region_overview.selected_country_employment).eq(2).then(($element) => {
            value = $element.text().split(':')[0].trim();
            valueAdded = $element.text().split(':')[1].replace(/[A-z,a-z,$'\']/g, '');
        });
        // Validate the Date year
        cy.get(pageObj.region_overview.selected_country_employment).last().then(($element) => {
            dateYear = $element.text().split(':')[0].trim();
            year = $element.text().split(':')[1].replace(/[A-z,a-z,'\']/g, '');
        });
    });

    it("Validate the overview page", () => {
        cy.get(pageObj.model_id.mouseover_view_region_details).trigger("mouseover");
        cy.wait(2000);
        // Click the Active icon
        cy.get(pageObj.model_id.active_icon).eq(1).click({ force: true });
        cy.wait(30000);
        // Validate the overview label
        cy.get(".MuiPaper-root button .MuiButton-label").first().invoke("text").should("eq", "Overview");
    });

    it("Validate the selected region details", () => {
        // Validate the employment
        cy.get(pageObj.region_overview.selected_country_employment).first().invoke("text").should("contain", employmentTitle);
        cy.get(pageObj.region_overview.selected_country_employment).first().invoke("text").should("contain", employmentValue);
        // Validate the Output
        cy.get(pageObj.region_overview.selected_country_employment).eq(1).invoke("text").should("contain", output);
        cy.get(pageObj.region_overview.selected_country_employment).eq(1).invoke("text").should("contain", outputValue);
        // Validate the Value added
        cy.get(pageObj.region_overview.selected_country_employment).eq(2).invoke("text").should("contain", value);
        cy.get(pageObj.region_overview.selected_country_employment).eq(2).invoke("text").should("contain", valueAdded);
        // Validate the Date year
        cy.get(pageObj.region_overview.selected_country_employment).last().invoke("text").should("contain", dateYear);
        cy.get(pageObj.region_overview.selected_country_employment).last().invoke("text").should("contain", year);
    });

    it("Click the selected regions close button", () => {
        cy.get(".MuiBox-root button").eq(2).click();
        cy.wait(2000);
    })
});
