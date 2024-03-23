import { faker } from '@faker-js/faker'

describe('Creating a Clone using SSH', () => {
    const project = {
        id: undefined,
        name: `project-${faker.datatype.uuid()}`,
        description: faker.random.words(5)
    }

    before(() => {
        cy.api_deleteAllProjects()
        cy.api_createProject(project)
        .then(response => {
            expect(response.status).to.equal(201)
            project.id = response.body.id
        })
    })
    
    it('sucessfully', () => {
        cy.cli_cloneViaSSH(project)

        cy.readFile(`cypress/downloads/${project.name}/README.md`)
            .should('contain', `# ${project.name}`)
            .and('contain', project.description)
    });
});