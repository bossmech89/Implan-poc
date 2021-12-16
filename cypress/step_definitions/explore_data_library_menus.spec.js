const pageObj = require('../page_objects/implan.po.json');
const common = require('../../common.js');
let commodityCompare;
let competencyByoccupationDetail;
let regionalOverview;
let IndustryGrowthAndTrends;
let footprintOverview;
let footprintByState;
let selectedFootprintByState;

describe("Explore data library menus", () => {
    it("I Login with valid username and password", () => {
        // Visit the URL
        common.visit();
        // Login with valid credentials
        common.loginWithValidUsernameAndPassword();
        cy.wait(4000);
    });

    it("Click the data library on dashboard", () => {
        cy.get(pageObj.model_id.dashboard_regions).eq(3).click({ force: true });
        cy.wait(3000);
    });

    it("Select the dashboards in the data library", () => {
        cy.get(pageObj.data_library.data_library_dashboard).eq(1).click();
        cy.wait(5000);
    });

    it("Validate the dashboard lists", () => {
        // Validate the commodity compare
        commodityCompare = Cypress.$(pageObj.data_library.commodity_compare).eq(0).text();
        cy.get(pageObj.data_library.commodity_compare).eq(0).click({force: true});
        cy.wait(10000);
        cy.looker().find(pageObj.data_library.selected_commodity_compare).invoke("text").should("eq", commodityCompare);
        // Validate the competency by occupation detail
        cy.get(pageObj.data_library.data_library_dashboard).eq(1).click();
        cy.wait(4000);
        competencyByoccupationDetail = Cypress.$(pageObj.data_library.commodity_compare).eq(1).text();
        cy.get(pageObj.data_library.commodity_compare).eq(1).click({force: true});
        cy.wait(10000);
        cy.looker().find(pageObj.data_library.selected_commodity_compare).invoke("text").should("eq", competencyByoccupationDetail);
    });

    it("Select the local area in the data library", () => {
        cy.get(pageObj.data_library.data_library_local_area).click();
        cy.wait(3000);
    });

    it("Validate the local area lists", () => {
        // Validate the regional overview
        regionalOverview = Cypress.$(pageObj.data_library.commodity_compare).eq(0).text();
        cy.get(pageObj.data_library.commodity_compare).eq(0).click({force: true});
        cy.wait(12000);
        cy.looker().find(pageObj.data_library.selected_commodity_compare).invoke("text").should("eq", regionalOverview);
        // Validate the regional industry compare
        cy.get(pageObj.data_library.data_library_local_area).click();
        cy.wait(4000);
        IndustryGrowthAndTrends = Cypress.$(pageObj.data_library.commodity_compare).eq(3).text();
        cy.get(pageObj.data_library.commodity_compare).eq(3).click({force: true});
        cy.wait(15000);
        cy.looker().find(pageObj.data_library.selected_commodity_compare).invoke("text").should("eq", IndustryGrowthAndTrends);
    });

    it("Select the foot print in the data library", () => {
        cy.get(pageObj.data_library.data_library_foot_print).click();
        cy.wait(3000);
    });

    it("Validate the local area lists", () => {
        // Validate the regional overview
        footprintOverview = Cypress.$(pageObj.data_library.commodity_compare).eq(0).text();
        cy.get(pageObj.data_library.commodity_compare).eq(0).click({force: true});
        cy.wait(12000);
        cy.looker().find(pageObj.data_library.selected_commodity_compare).invoke("text").should("eq", footprintOverview);
        // Validate the regional industry compare
        cy.get(pageObj.data_library.data_library_foot_print).click();
        cy.wait(4000);
        footprintByState = Cypress.$(pageObj.data_library.commodity_compare).eq(1).text().toLowerCase();
        cy.get(pageObj.data_library.commodity_compare).eq(1).click({force: true});
        cy.wait(15000);
        cy.looker().find(pageObj.data_library.selected_commodity_compare).then(($element) => {
            selectedFootprintByState = $element.text().toLowerCase();
            expect(selectedFootprintByState).to.equal(footprintByState);
        })
    });
});
