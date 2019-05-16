describe('Friend add test', function () {
  it('should route to add friends ', function () {
    cy.visit('http://localhost:4200/friends/add')
    cy.contains('Name')
  });
})
