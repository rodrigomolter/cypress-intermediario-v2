import { faker } from '@faker-js/faker'
describe('Create a new Issue by API', () => {

    const project = {
        id: undefined,
        name: `project-${faker.datatype.uuid()}`,
        description: faker.random.words(5)
    }

    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(10)
    }

    before(() => {
        cy.api_deleteAllProjects()
    })

    it('New Issue', () => {
        cy.api_createProject(project)
        .then(response => {
            expect(response.status).to.equal(201)
            project.id = response.body.id
        })
        cy.api_createIssue(project, issue)

    });
});