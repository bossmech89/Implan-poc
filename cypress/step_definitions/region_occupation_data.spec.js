const common = require('../../common.js');
const pageObj = require("../page_objects/implan.po.json");
let regionOccupationSummary;
let regionOccupationAverages;
let industryOccupationDetail;
let industryOccupationAverages;

describe("Validate the region occupation data", () => {
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
        cy.wait(10000);
        // Click the map icon
        cy.get(pageObj.model_id.map_icon_one).eq(1).click({ force: true });
        cy.wait(2000);
        cy.get(pageObj.model_id.map_icon_two).eq(0).click({ force: true });
        cy.wait(4000);
        // Select the states
        cy.get(pageObj.combine_regions.maine_state).click({ force: true });
    });

    it("I Navigate to view region details page", () => {
        cy.get(pageObj.model_id.mouseover_view_region_details).trigger("mouseover");
        cy.wait(2000);
        // Click the Active icon
        cy.get(pageObj.model_id.active_icon).eq(1).click({ force: true });
        cy.wait(8000);
        // Click the occupation data
        cy.get(pageObj.model_id.occupation_data).click({ force: true });
    });

    it("Validate occupation data details", () => {
        // Select region occupation summary
        regionOccupationSummary = Cypress.$(pageObj.model_id.region_occupation_summary).eq(1).text();
        cy.get(pageObj.model_id.region_occupation_summary).eq(1).click({force: true});
        cy.wait(10000);
        cy.looker().find(pageObj.model_id.selected_region_occupation_summary).invoke("text").should("eq", regionOccupationSummary);
        // Select region occupation averages
        cy.get(pageObj.model_id.occupation_data).click({ force: true });
        regionOccupationAverages = Cypress.$(pageObj.model_id.region_occupation_summary).eq(2).text();
        cy.get(pageObj.model_id.region_occupation_summary).eq(2).click({force: true});
        cy.wait(2000);
        cy.looker().find(pageObj.model_id.selected_region_occupation_summary).invoke("text").should("eq", regionOccupationAverages);
        // Select industry occupation detail
        cy.get(pageObj.model_id.occupation_data).click({ force: true });
        industryOccupationDetail = Cypress.$(pageObj.model_id.region_occupation_summary).eq(3).text();
        cy.get(pageObj.model_id.region_occupation_summary).eq(3).click({force: true});
        cy.wait(5000);
        cy.looker().find(pageObj.model_id.selected_region_occupation_summary).invoke("text").should("eq", industryOccupationDetail);
        // Select industry occupation averages
        cy.get(pageObj.model_id.occupation_data).click({ force: true });
        industryOccupationAverages = Cypress.$(pageObj.model_id.region_occupation_summary).eq(4).text();
        cy.get(pageObj.model_id.region_occupation_summary).eq(4).click({force: true});
        cy.wait(5000);
        cy.looker().find(pageObj.model_id.selected_region_occupation_summary).invoke("text").should("eq", industryOccupationAverages);
        // Select core competencies
        cy.get(pageObj.model_id.occupation_data).click({ force: true });
        cy.get(pageObj.model_id.region_occupation_summary).eq(5).click({force: true});
        // Select competencies region summary
        cy.get(pageObj.model_id.region_occupation_summary).eq(6).click({force: true});
        cy.wait(3000);
        // Select competencies Industry summary
        cy.get(pageObj.model_id.occupation_data).click({ force: true });
        cy.get(pageObj.model_id.region_occupation_summary).eq(5).click({force: true});
        cy.get(pageObj.model_id.region_occupation_summary).eq(7).click({force: true});
        cy.wait(3000);
        // Select competencies Occupation summary
        cy.get(pageObj.model_id.occupation_data).click({ force: true });
        cy.get(pageObj.model_id.region_occupation_summary).eq(5).click({force: true});
        cy.get(pageObj.model_id.region_occupation_summary).eq(8).click({force: true});
        cy.wait(3000);
    });
});
