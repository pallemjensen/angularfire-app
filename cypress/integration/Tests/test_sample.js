describe('Routing test', function () {
  it('should route to home ', function () {
    cy.visit('http://localhost:4200/home')
    cy.contains('friends').click()
  });
})
