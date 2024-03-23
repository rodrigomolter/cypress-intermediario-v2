Cypress.Commands.add('login', (
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
    { cacheSession = true } = {},
  ) => {
    const login = () => {
      
      cy.visit('/users/sign_in')
  
      cy.get("[data-qa-selector='login_field']").type(user)
      cy.get("[data-qa-selector='password_field']").type(password, { log: false })
      cy.get("[data-qa-selector='sign_in_button']").click()
      cy.get('.qa-user-avatar').should('be.visible')
    }

    const validate = () => {
      cy.visit('/')
      cy.location('pathname', { timeout: 1000 })
        .should('not.eq', '/users/sign_in')
    }

    const options = {
      cacheAcrossSpecs: true,
      validate,
    }
    
    if (cacheSession) {
      cy.session(user, login, options)
    } else {
      login()
    }
  })

  Cypress.Commands.add('logout', () => {
    cy.get('.qa-user-avatar').should('be.visible').click()
    cy.get('[data-qa-selector="sign_out_link"]').click()
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`)
  })

  Cypress.Commands.add('createProject', project => {
    cy.visit('/projects/new')
    cy.get('#project_name').type(project.name);
    cy.get('#project_description').type(project.description);
    cy.get('.qa-initialize-with-readme-checkbox').check()
    cy.contains('Create project').click()
  })
 