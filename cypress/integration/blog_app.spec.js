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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'admin', password: '123456' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('input[name="title"]').type('TestTitle')
      cy.get('input[name="author"]').type('TestAuthor')
      cy.get('input[name="url"]').type('https://testurl.com')
      cy.get('#blog-create').click()
      cy.get('.success')
        .should('contain', 'a new blog TestTitle by TestAuthor added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('.blog-title').contains('TestTitle')
      cy.get('.blog-author').contains('TestAuthor')
    })

    describe.only('When one blog already created', function() {
      beforeEach(function () {
        cy.createBlog({ title: 'TestTitle', author: 'TestAuthor', url: 'TestUrl' })
      })

      it('it can be liked', function() {
        cy.get('.blog-view').click()
        cy.get('.blog-likes').contains('likes 0')
        cy.get('.blog-like').click()
        cy.get('.blog-likes').contains('likes 1')
      })
    })
  })
})