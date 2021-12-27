beforeEach(() => {
    cy.request("GET", "api/users").as("users");
});

let email = [];
describe("Validate the API requests", () => {

    it("Create the new user", () => {
        cy.request({
            method: "POST",
            url: "api/users",
            body: { name: "lindsay", job: "Teamlead", email: "lindsay@gmail.com" }
        }).then((response) => {
            expect(response.body).to.have.property("name", "newUser");
        });
    });

    it("Validate the created user email ID", () => {
        cy.request({
            method: "GET",
            url: "api/users"
        }).then((response) => {
            let body = JSON.parse(JSON.stringify(response.body.data));
            body.forEach(element => {
                email.push(element["email"])
            });
        }).then(() => {
            let lastEmail = email[email.length - 1];
            expect(lastEmail).to.equal("lindsay@gmail.com");
        })
    })
});
