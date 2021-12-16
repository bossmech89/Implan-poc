const common = require('../../common.js');
const pageObj = require("../page_objects/implan.po.json");
let stateName = "California";

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
        cy.get(pageObj.model_id.search_input).type(stateName);
    });
});
