/*
    Authenticated user creates a new Mentorship Engagement.
*/
describe("Authenticated user creates a Mentorship Engagement", () => {
    it("Authenticated user creates a Mentorship Engagement", () => {
        cy.loginWith("pecan@pie.org", "Pecan")
        cy.visit("/node/add/mentorship_engagement")

        // check the box for "I am looking for a mentor"
        cy.get("#edit-field-me-looking-for-mentor").check()

        cy.get("#edit-title-0-value").type("Mentorship Title")

        cy.get("#edit-body-0-summary").type("Mentorship Summary")

        cy.get('.form-item-body-0-value .ck-content').then(el => {
            const editor = el[0].ckeditorInstance
            editor.setData('Mentoring supports the growth of a vibrant HPC community by connecting students with experienced mentors. Matches are based on multiple factors, including research interests, career goals, long-term plans, and general interests. Providing valuable professional advice and resources that will benefit mentees which might include: sharing expertise in your specific research domain/discipline, sharing personal experiences and advice that might benefit your student mentee, encouraging students to stay abreast of scholarly literature and cutting-edge ideas in their field, Encouraging the open exchange of ideas, Facilitating networking opportunities with other faculty or professionals on campus or within the broader research community as appropriate.')
        })

        // get tag suggestions
        // cy.get("#field-tags-replace input[type='submit']").click()

        cy.get("details.tags summary").click()
        cy.get("#tag-ai").click()

        cy.get('.form-item-field-me-preferred-attributes-0-value .ck-content').then(el => {
            const editor = el[0].ckeditorInstance
            editor.setData('Be nice.')
        })

        cy.get('#edit-field-me-state').select('Recruiting')

        cy.get(".node-mentorship-engagement-form #edit-submit").click()
    });
});