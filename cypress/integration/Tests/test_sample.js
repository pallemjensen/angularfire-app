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



describe('Freinds title', function () {
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

describe('Update button', function () {
  it('should contain a button for the update-friend page', function () {
    cy.visit('http://localhost:4200/friends')
    cy.contains('Update').click()
  });
})





describe('Update friend button', function () {
  it('should contain a button for updating the friend', function () {
    cy.visit('http://localhost:4200/friends/update/5pEkfpSNvNun1uVNANEw')
    cy.pause()
    cy.contains('Update friend').click()
  });
})



describe('Email test', function () {
  it('Gets, types and asserts', function () {
    cy.visit('http://localhost:4200/friends/add')
    cy.url('include', '/friends/add')

    cy.get('mail')
      .type('friend@email.com')
      .should('have.value', 'fake@email.com')
  });
})

describe('Contains file selector', function () {
  it('should contain file selector', function () {
    cy.visit('http://localhost:4200/friends/add')
    cy.contains('file').click()
  });
})
