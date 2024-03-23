import { faker } from '@faker-js/faker'
const options = { env: { snapshotOnly: true } }
describe('Create a New Issue by GUI', options, () => {

  const project = {
    name: `project-${faker.datatype.uuid()}`,
    description: faker.random.words(5)
  }

  const issue = {
    title: `Issue  ${faker.datatype.uuid()}`,
    description: faker.random.words(10)
  }

  beforeEach(() => {
    cy.api_deleteAllProjects()
    cy.api_createProject(project)
    cy.gui_login()
  })

  it('Create New Issue', () => {
    cy.gui_createIssue(project, issue)
  });
});