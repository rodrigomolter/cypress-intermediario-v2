import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }
describe('Create a new Project by GUI', options, () => {
  beforeEach(() => {
    cy.api_deleteAllProjects()
    cy.gui_login()
  })

  it('New Project', () => {
    const project = {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5)
    }
    
    cy.gui_createProject(project)
  });
});