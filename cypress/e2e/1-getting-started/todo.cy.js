/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Cinemo App', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3000')
  })

  it('display login page by default', () => {
    // Validate that the login page is displayed by default
    cy.url().should('include', '/pages/login')
    cy.get('form input').should('have.length', 3)
    cy.get('form input[id="username"]').should('exist')
    cy.get('form input[type="password"]').should('exist')
    cy.get('form button').should('exist')
    cy.get('form button').should('have.text', 'Login')
  })

  it('can login', () => {
    // Login
    cy.get('form input[id="username"]').type('admin')
    cy.get('form input[type="password"]').type('admin')
    cy.get('form button').click({ multiple: true})
    
    // Validate if redirected to dashboard
    cy.url().should('eq', 'http://localhost:3000/')
    cy.title().should('eq', 'Cinemo - Little Cinemo Management System')

    // Clear the local storage
    cy.clearLocalStorage()
  })

  it('can logout', () => {
    // Login
    cy.get('form input[id="username"]').type('admin')
    cy.get('form input[type="password"]').type('admin')
    cy.get('form button').click({ multiple: true})

    // Wait for dashboard to load
    cy.wait(1000)

    // Logout
    cy.get('.MuiAvatar-root img').click({
      multiple: true,
      force: true
    })
    cy.get('li').contains('Logout').click({
      force: true
    })

    // Validate if redirected to login page
    cy.url().should('include', '/pages/login')
  })
})
