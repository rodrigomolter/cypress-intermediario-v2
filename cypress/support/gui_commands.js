Cypress.Commands.add('gui_login', (
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

  Cypress.Commands.add('gui_logout', () => {
    cy.get('.qa-user-avatar').should('be.visible').click()
    cy.get('[data-qa-selector="sign_out_link"]').click()
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`)
  })

  Cypress.Commands.add('gui_createProject', project => {
    cy.visit('/projects/new')
    cy.get('#project_name').type(project.name);
    cy.get('#project_description').type(project.description);
    (project.initializeWithReadme || true) ? cy.get('.qa-initialize-with-readme-checkbox').check() : cy.get('.qa-initialize-with-readme-checkbox').uncheck()
    cy.contains('Create project').click()

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`)
    cy.contains(project.name).should('be.visible')
    cy.contains(project.description).should('be.visible')
  })

  Cypress.Commands.add('gui_createIssue', (project, issue) => {
    cy.visit(`${Cypress.env('user_name')}/${project.name}/issues/new`)

    cy.get('#issue_title').type(issue.title);
    cy.get('#issue_description').type(issue.description);

    cy.contains('Submit issue').click()

    cy.get('.issue-details')
      .should('contain', issue.title)
      .and('contain', issue.description)
  })

  Cypress.Commands.add('gui_setLabelOnIssue', label => {
    cy.get('.qa-edit-link-labels').click()
    cy.contains(label.name).click()
    cy.get('body').click()
  })

  Cypress.Commands.add('gui_setMilestoneOnIssue', milestone => {
    cy.get('.block.milestone .edit-link').click()
    cy.contains(milestone.title).click()

  })
 