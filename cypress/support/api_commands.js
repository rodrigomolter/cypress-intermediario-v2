const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}`

Cypress.Commands.add('api_createProject', project => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/`,
    body: {
      name: project.name,
      description: project.description,
      initialize_with_readme: project.initializeWithReadme || true
    },
    headers: { Authorization: accessToken },
  })
})

Cypress.Commands.add('api_deleteAllProjects', () => {
  cy.api_getAllProjects().then(response => {
    response.body.forEach(project => {
      cy.request({
        method: 'DELETE',
        url: `/api/v4/projects/${project.id}`,
        headers: { Authorization: accessToken },
      })
    })
  })

})

Cypress.Commands.add('api_getAllProjects', () => {
  cy.request({
    method: 'GET',
    url: `/api/v4/projects/`,
    headers: { Authorization: accessToken },
  })
})

Cypress.Commands.add('api_createIssue', (project, issue) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${project.id}/issues`,
    body: {
      title: issue.title,
      description: issue.description,
    },
    headers: { Authorization: accessToken },
  })
})

Cypress.Commands.add('api_createLabel', (project, label) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${project.id}/labels`,
    body: {
      name: label.name,
      color: label.color || '#ffaabb',
    },
    headers: { Authorization: accessToken },
  })
})

Cypress.Commands.add('api_createMilestone', (project, milestone) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${project.id}/milestones`,
    body: {
      title: milestone.title,
    },
    headers: { Authorization: accessToken },
  })
})