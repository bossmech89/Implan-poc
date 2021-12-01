const common = require('../../common.js');
let countryName;
let employmentAdditionValue = 1;
let customRegionName;

describe("Validate the combined and customized model", () => {
    it("I Login with valid username and password", () => {
        // Visit the URL
        common.visit();
        // Login with valid credentials
        common.loginWithValidUsernameAndPassword();
        cy.wait(4000);
    });

    it("Click the regions on dashboard", () => {
        cy.get(".MuiGrid-container div:nth-child(1) h2").first().click({ force: true });
        cy.wait(3000);
    });

    it("Search region by country", () => {
        cy.wait(10000);
        // Click the map icon
        cy.get(".MuiButtonGroup-root button").eq(1).click({ force: true });
        cy.wait(2000);
        cy.get(".MuiButtonGroup-root button").eq(0).click({ force: true });
        cy.wait(6000);
        // Select the countries
        cy.get("#region-map path[data-description='Oregon']").click({ force: true });
        cy.get("#region-map path[data-description='Minnesota']").click({ force: true });
        cy.wait(4000);
    });

    // Validate the combined region
    it("Create the combine regions", () => {
        cy.get("#application-root .MuiPaper-rounded .MuiBox-root button").first().click();
        cy.wait(3000);
        // Click the combine region
        cy.get(".MuiTypography-displayBlock").click({ force: true });
        cy.wait(3000);
        // Enter the combined regions name
        countryName = common.combinedCountryName(5);
        cy.get("form .MuiInputBase-root input").type(countryName);
        cy.wait(2000);
        // Click the save button
        cy.get(".MuiDialogActions-root button .MuiButton-label").eq(1).click({ force: true });
        cy.wait(5000);
        // Generate the combined region
        common.generateCombinedRegion();
    });

    it("Validate the combined country name", () => {
        cy.wait(3000);
        // Delete the combined region
        cy.get(".MuiCardContent-root .MuiTouchRipple-root").eq(0).click({ force: true });
        cy.wait(4000);
        // Click the map icon
        cy.get(".MuiButtonGroup-root button").eq(1).click({ force: true });
        cy.wait(2000);
        cy.get(".MuiButtonGroup-root button").eq(0).click({ force: true });
        cy.wait(6000);
        // Enter the combined country name
        cy.get(".MuiAutocomplete-inputRoot input").type(countryName, { force: true });
        cy.wait(2000);
        cy.get(".MuiAutocomplete-popper div ul li").eq(0).click({ force: true });
        cy.wait(3000);
        // Validate the country name
        cy.get(".MuiCard-root .MuiBox-root h3").invoke("text").should("eq", countryName);
    });

    // Validate the customized region
    it("View region details page", () => {
        cy.wait(3000);
        cy.get("div[title='View Region Details']").trigger("mouseover");
        cy.wait(2000);
        // Click the Active icon
        cy.get(".MuiCardContent-root .MuiIconButton-root").eq(1).click({ force: true });
        cy.wait(15000);
    });

    it("Customize the region", () => {
        // Click the model button
        cy.get(".MuiPaper-root .MuiToolbar-regular .MuiIconButton-sizeSmall").eq(1).click({ force: true });
        cy.wait(2000);
        cy.get(".MuiPaper-root .MuiListItemText-root .MuiTypography-displayBlock").click({ force: true });
        cy.wait(10000);
        // Select industry to customize
        cy.get(".MuiAutocomplete-root input").type("1 - Oilseed farming");
        cy.wait(5000);
        cy.get(".MuiBox-root button").eq(2).click({ force: true });
        cy.wait(5000);
        // Click the employment output field
        cy.get("#outputPerWorker").click({force: true});
        cy.wait(2000);
        // Enter the employment output value
        cy.get(".MuiBox-root .MuiFormControl-root .MuiInputBase-root input").eq(2).type(employmentAdditionValue);
        // Click the complete customization button
        cy.get(".MuiBox-root .MuiButton-disableElevation").click({force: true});
        // Enter the new custom region name
        customRegionName = common.combinedCountryName(5);
        cy.get("#name-customized-region-modal input").type(customRegionName);
        // Click the save button
        cy.get(".MuiDialogActions-root button").eq(1).click();
        cy.wait(25000);
    });

    it("Validate the created custom region name", () => {
        cy.wait(3000);
        // Delete the custom region
        cy.get(".MuiCardContent-root .MuiTouchRipple-root").eq(0).click({ force: true });
        cy.wait(4000);
        // Click the map icon
        cy.get(".MuiButtonGroup-root button").eq(1).click({ force: true });
        cy.wait(2000);
        cy.get(".MuiButtonGroup-root button").eq(0).click({ force: true });
        cy.wait(6000);
        // Enter the custom country name
        cy.get(".MuiAutocomplete-inputRoot input").type(customRegionName, { force: true });
        cy.wait(2000);
        cy.get(".MuiAutocomplete-popper div ul li").eq(0).click({ force: true });
        cy.wait(3000);
        // Validate the country name
        cy.get(".MuiCard-root .MuiBox-root h3").invoke("text").should("eq", customRegionName);
    });
});
