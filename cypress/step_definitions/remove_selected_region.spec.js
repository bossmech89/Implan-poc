const pageObj = require('../page_objects/implan.po.json');
const common = require('../../common.js');
let stateName = "California";
let overview = "Overview";
let zipcode = "60002";

describe("Remove selected region", () => {
    it("I Login with valid username and password", () => {
        // Visit the URL
        common.visit();
        // Login with valid credentials
        common.loginWithValidUsernameAndPassword();
        cy.wait(4000);
    });

    it("Click the regions on dashboard", () => {
        cy.get(pageObj.model_id.dashboard_regions).first().click({ force: true });
        cy.wait(3000);
    });

    it("Search region by state", () => {
        cy.wait(2000);
        // Click the map icon
        cy.get(pageObj.model_id.map_icon_one).eq(1).click({ force: true });
        cy.wait(8000);
        cy.get(pageObj.model_id.map_icon_two).eq(0).click({ force: true });
        // Enter the state name
        cy.get(pageObj.model_id.search_input).type(stateName);
        cy.wait(2000);
        cy.get(pageObj.model_id.search_autocomplete).eq(0).click({ force: true });
        cy.wait(3000);
    });

    it("I Navigate to the view region details page", () => {
        cy.get(pageObj.model_id.mouseover_view_region_details).trigger("mouseover");
        cy.wait(2000);
        // Click the Active icon
        cy.get(pageObj.model_id.active_icon).eq(1).click({ force: true });
        cy.wait(10000);
        // Click the Filters 1
        cy.looker().find(pageObj.model_id.filters_1).click({ force: true });
    });

    it("Click the trash icon", () => {
        // validate the overview label
        cy.get(pageObj.create_impact.overview_label).eq(0).invoke("text").should("contain", overview);
        // Click the trash icon
        cy.get(pageObj.create_impact.selected_region_trash_icon).eq(1).click({force: true});
        cy.wait(2000);
        cy.get(pageObj.create_impact.region_map).invoke("attr", "fill").should("contains", "transparent");
    });

    it("Search region by zipcode", () => {
        cy.wait(2000);
        // Click the map icon
        cy.get(pageObj.model_id.map_icon_one).eq(1).click({ force: true });
        cy.wait(8000);
        cy.get(pageObj.model_id.map_icon_two).eq(0).click({ force: true });
        // Enter the state name
        cy.get(pageObj.model_id.search_input).type(zipcode);
        cy.wait(2000);
        cy.get(pageObj.model_id.search_autocomplete).eq(0).click({ force: true });
        cy.wait(3000);
    });

    it("I Navigate to the view region details page", () => {
        cy.get(pageObj.model_id.mouseover_view_region_details).trigger("mouseover");
        cy.wait(2000);
        // Click the Active icon
        cy.get(pageObj.model_id.active_icon).eq(1).click({ force: true });
        cy.wait(10000);
        // Click the Filters 1
        cy.looker().find(pageObj.model_id.filters_1).click({ force: true });
    });

    it("Click the trash icon", () => {
        // validate the overview label
        cy.get(pageObj.create_impact.overview_label).eq(0).invoke("text").should("contain", overview);
        // Click the trash icon
        cy.get(pageObj.create_impact.selected_region_trash_icon).eq(1).click({force: true});
        cy.wait(2000);
        cy.get(pageObj.create_impact.region_map).invoke("attr", "fill").should("contains", "transparent");
    })
});
