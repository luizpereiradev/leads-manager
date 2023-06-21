import { faker } from '@faker-js/faker';

export const newValidLead = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    phone: '(61) 99999-9999',
    description: faker.lorem.paragraph(),
};

export const completeLead = {
    ...newValidLead,
    id: 1,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
    status: 'novo'
}

export const newInvalidLead = {
    name: faker.lorem.word(),
    email: faker.lorem.word(),
    phone: faker.lorem.word(),
    description: faker.lorem.word(),
};