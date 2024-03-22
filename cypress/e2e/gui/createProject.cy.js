import { faker } from '@faker-js/faker'
describe('Create Project', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/')
  })

  it('New Project', () => {
    const project = {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5)
    }

    cy.createProject(project)

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`)
    cy.contains(project.name).should('be.visible')
    cy.contains(project.description).should('be.visible')

    
  });
});