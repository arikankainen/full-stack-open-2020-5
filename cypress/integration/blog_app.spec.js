describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Administrator',
      username: 'admin',
      password: '123456'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name="Username"]').type('admin')
      cy.get('input[name="Password"]').type('123456')
      cy.get('#login-button').click()
      cy.contains('Administrator logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input[name="Username"]').type('admin')
      cy.get('input[name="Password"]').type('wrongpassword')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})