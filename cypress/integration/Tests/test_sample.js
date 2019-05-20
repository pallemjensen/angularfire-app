describe('Routing test', function () {
  it('should route to home ', function () {
    cy.visit('http://localhost:4200/home')
    cy.contains('friends').click()
  });
})
describe('Add friends test',function () {
  it('should route to add friends', function () {
    cy.visit('http://localhost:4200/friends/add')
    cy.contains('Add friend').click()
})

  describe('Contains file selector', function () {
    it('should contain file selector', function () {
      cy.visit('http://localhost:4200/friends/add')
      cy.contains('file').click()
    });

  })
});



