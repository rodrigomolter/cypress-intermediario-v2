import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Set a Milestone on a issue by GUI', options, () => {
    const project = {
        id: undefined,
        name: `project-${faker.datatype.uuid()}`,
        description: faker.random.words(5)
    }

    const issue = {
        id: undefined,
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(10)
    }

  const milestone = {
    title: `milestone-${faker.random.word()}`,

  }

  beforeEach(() => {
    cy.api_deleteAllProjects()
    cy.gui_login()
    cy.api_createProject(project)
    .then(response => {
        expect(response.status).to.equal(201)
        project.id = response.body.id
    })
    cy.api_createIssue(project, issue)
    .then(response => {
      expect(response.status).to.equal(201)
      issue.id = response.body.iid
      cy.api_createMilestone(project, milestone)
      cy.visit(`${Cypress.env('user_name')}/${project.name}/issues/${issue.id}`)
  })

  })

  it('successfully', () => {
    cy.gui_setMilestoneOnIssue(milestone)

    cy.get('.block.milestone').should('contain', milestone.title)
  })
})
