import { iteratee } from "lodash"

describe("Validate the API requests", () => {
    it("validate the get request", () => {
        cy.request("https://reqres.in/api/users").then((response) => {
            // Validate the first user
            expect(response.body.data[0]).to.have.property("email", "george.bluth@reqres.in");
            expect(response.body.data[0].first_name).to.equal("George");
            // Validate the second user
            expect(response.body.data[1]).to.have.property("email", "janet.weaver@reqres.in")
            expect(response.status).to.equal(200);
            expect(response.body.data).to.have.length(6);
        })
    });

    it("Create the new user", () => {
        cy.request("POST", "https://reqres.in/api/users", {name : "Mark", job: "Teamlead"}).then((response) => {
            expect(response.body).to.have.property("name", "Mark")
        });
    })
})
