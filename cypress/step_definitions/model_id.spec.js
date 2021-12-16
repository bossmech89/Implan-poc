let regionId;
// let stateName = "Cass County, Illinois";
const pageObj = require('../page_objects/implan.po.json');
import * as States from "../../states.js";
const common = require('../../common.js');
let randomNumber;

async function buildGenerate() {
    return cy.get(".MuiCardContent-root").then($element => {
        if (Cypress.$('.MuiCardContent-root button.Mui-disabled').length > 0) {
            cy.wait(30000);
            return buildGenerate();
        } else {
            return true;
        }
    })
};

function buildregion() {
    // Hover the In-active icon
    return cy.get(".MuiCardContent-root").then($element => {
        if ($element.find("div[title='Click to build Region']").length > 0) {
            cy.get(pageObj.model_id.mouseover_inactive_icon).trigger("mouseover")
            cy.wait(6000);
            // Click the In-Active icon
            cy.get(pageObj.model_id.inactive_icon).eq(1).click({ force: true });
            cy.wait(20000);
            buildGenerate();
            return true;
        } else {
            // Click the delete icon
            cy.get(pageObj.model_id.region_delete_icon).eq(0).click({ force: true });
            // Clear the state name
            cy.get(pageObj.model_id.serach_input).clear();
            // Enter the state name
            cy.get(pageObj.model_id.serach_input).type(States[randomNumber]);
            cy.wait(2000);
            cy.get(pageObj.model_id.search_autocomplete).eq(0).click({ force: true });
            cy.wait(6000);
            buildregion();
        }
    })
};

function newUserRegionId(userName) {
    // Enter the valid user mail id
    cy.get("input[name='username']").type(userName);
    // Enter the valid password
    const password = "implan@123";
    cy.get("input[name='password']").type(password);
    // Click the Login button
    cy.get(".auth0-lock-cred-pane button").click();
    // Click the region
    cy.get(".MuiGrid-container div:nth-child(1) h2").first().click({ force: true });
    // Click the map icon
    cy.wait(12000);
    cy.get(".MuiButtonGroup-root button").eq(1).click({ force: true });
    cy.wait(2000);
    cy.get(".MuiButtonGroup-root button").eq(0).click({ force: true });
    // Enter the State name
    cy.get(".MuiPaper-rounded .MuiAutocomplete-inputRoot input").type(stateName);
    cy.wait(2000);
    cy.get(".MuiAutocomplete-popper .MuiAutocomplete-paper ul li").eq(0).click();
    cy.get("div[title='View Region Details']").trigger("mouseover");
    // Click the Active icon
    cy.get(".MuiCardContent-root .MuiIconButton-root").eq(1).click({ force: true });
    cy.wait(20000);
    // Click the Filters 1
    cy.looker().find(".fNjRST span .kjfTJU").click({ force: true });
    // Validate the region ID 
    cy.looker().find(".AIRam .knAPns").invoke("text").should("eq", regionId);
    // Click the profile icon
    cy.get(".MuiToolbar-root .MuiIconButton-sizeSmall").eq(0).click();
    // Click the logout option
    cy.get(".MuiPaper-root .MuiListItemText-root .MuiTypography-displayBlock").eq(2).click();
    cy.wait(4000);
}

describe("Generate the Model ID", () => {
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
        cy.wait(10000);
        // Click the map icon
        cy.get(pageObj.model_id.map_icon_one).eq(1).click({ force: true });
        cy.wait(8000);
        cy.get(pageObj.model_id.map_icon_two).eq(0).click({ force: true });
        // Enter the state name
        randomNumber = (Math.floor(Math.random() * 88));
        console.log(randomNumber);
        debugger;
        cy.get(pageObj.model_id.search_input).type(States[randomNumber]);
        cy.wait(3000);
        cy.get(pageObj.model_id.search_autocomplete).eq(0).click({ force: true });
        cy.wait(6000);
        buildregion();
        // // Hover the In-active icon
        // if (cy.get(pageObj.model_id.mouseover_inactive_icon).trigger("mouseover")) {
        //     cy.wait(6000);
        //     // Click the In-Active icon
        //     cy.get(pageObj.model_id.inactive_icon).eq(1).click({ force: true });
        //     cy.wait(20000);
        //     buildGenerate();
        // };
    });

    it("I Navigate to the view region details page", () => {
        cy.get(pageObj.model_id.mouseover_view_region_details).trigger("mouseover");
        cy.wait(2000);
        // Click the Active icon
        cy.get(pageObj.model_id.active_icon).eq(1).click({ force: true });
        cy.wait(30000);
        // Click the Filters 1
        cy.looker().find(pageObj.model_id.filters_1).click({ force: true });
    });

    it("Validate the Region ID", () => {
        cy.looker().find(pageObj.model_id.region_id).then(($element) => {
            regionId = $element.text();
        })
    });

    it("Logout the application", () => {
        // Click the profile icon
        cy.get(pageObj.model_id.profile_icon).eq(0).click();
        // Click the logout option
        cy.get(pageObj.model_id.logout).eq(2).click();
        cy.wait(2000);
    });

    it("Validate the region ID with Bypass user", () => {
        newUserRegionId("implan0001@gmail.com")
    });

});

