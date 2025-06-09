describe("add a blog post with a tag", () => {

  it("Add a 'test-blog-post' for 'login' tag and verify it appears", () => {
    cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    cy.visit('/node/add/blog_post');
    cy.get('input[name="title[0][value]"]').type('test-blog-post', { delay: 0 });
    cy.get('select[name="field_tags[]"]').select('682');
    cy.get('input[name="status[value]"]').check();
    cy.get('input[name="op"]').contains('Save').click();
    cy.contains('has been created');
    cy.contains('login');

    cy.visit('/user/logout');
    cy.visit('/tags/login');
    cy.contains('Blog Entries');
  });

});
