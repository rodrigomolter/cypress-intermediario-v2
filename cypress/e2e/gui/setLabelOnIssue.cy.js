import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Set a Label on a issue by GUI', options, () => {
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

  const label = {
    name: `label-${faker.random.word()}`,
    color: '#ffaabb'
  }

  beforeEach(() => {
    cy.api_deleteAllProjects()
    cy.gui_login()
    cy.api_createProject(project)
    .then(response => {
        expect(response.status).to.equal(201)
        project.id = response.body.id
    });
    cy.api_createIssue(project, issue)
    .then(res => {
      expect(res.status).to.equal(201);
      issue.id = res.body.iid;
      cy.api_createLabel(project, label)
      cy.visit(`${Cypress.env('user_name')}/${project.name}/issues/${issue.id}`)
    })

  })

  it('successfully', () => {
    cy.gui_setLabelOnIssue(label)

    cy.get('.qa-labels-block').should('contain', label.name)
    cy.get('.qa-labels-block span')
      .should('have.attr', 'style', `background-color: ${label.color}; color: #333333;`)
  })
})
