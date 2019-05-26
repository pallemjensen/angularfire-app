describe('Route to home', function () {
  it('should route to home ', function () {
    cy.visit('http://localhost:4200/home')
    cy.contains('friends').click()
  });
})
describe('Add friends route test',function () {
  it('should route to add friends', function () {
    cy.visit('http://localhost:4200/friends/add')
    cy.contains('Add friend').click()
  });
})

describe('Map route test', function() {
  it('should route to map', function () {
    cy.visit('http://localhost:4200/maps')
  });
})

describe('Friends title', function () {
  it('should contain a h1 tag', function () {
    cy.visit('http://localhost:4200/friends')
    cy.contains("Friends:")
  });
})

describe('clicking "map" shows the right headings', function () {
  it('should show the correct headings', function () {
  cy.visit('http://localhost:4200/maps')
  cy.contains('Home')
  cy.contains('Show your friends on the map')
  cy.contains('Friend Administration')
  });
})

describe('Friend form creation', function () {
  it('should have friend fields', function () {
    cy.visit('http://localhost:4200/friends/add')
    cy.get('form').contains('Add friend')
  });
})

describe('Show frontpage picture', () => {
  it('Displayed the image', function () {
    cy.visit('http://localhost:4200/home')
    cy.get('img').should('be.visible');
  });
})


describe('Buttons ',  () => {
  it('friend add page should contain 4 buttons ', function () {
    cy.visit('http://localhost:4200/friends/add')
    cy.get('button').should('have.length', 4);
});

  it('should contain a button for updating the friend', function () {
    cy.visit('http://localhost:4200/friends/update/5pEkfpSNvNun1uVNANEw')
    cy.contains('Update friend').click()
  });

  it('should contain a button for the update-friend page', function () {
    cy.visit('http://localhost:4200/friends')
    cy.contains('Update').click()
  });
})

describe('friend creation form', () => {
  it('should have the friend fields for adding a friend', function () {
    cy.visit('http://localhost:4200/friends/add')
    cy.contains('Add friend').click()
    cy.get('[formControlName="name"]').type('testName')
      .should('have.value', 'testName')
    cy.get('[formControlName="address"]').type('testAddress')
      .should('have.value', 'testAddress')
    cy.get('[formControlName="mail"]').type('testMail')
      .should('have.value', 'testMail')
    cy.get('[formControlName="phone"]').type('testPhone')
      .should('have.value', 'testPhone')
  });
})

