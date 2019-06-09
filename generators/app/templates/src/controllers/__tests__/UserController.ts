import { getRepository, Connection } from 'typeorm';
import { createTypeormConn } from '../../lib/typeorm';
import { User } from '../../entities/User';
import * as request from "supertest";
import app from '../../lib/app';
import { deleteAll } from '../../lib/testUtils';

describe("UserController integration test", (): void => {
    beforeAll(async (): Promise<void> => {
        const connection: Connection = await createTypeormConn();
        await deleteAll(connection, User);
    });

    it('should create user', async (): Promise<void> => {
        const username = 'testRegister';
        const response = await request(app)
            .post('/user')
            .set('Content-Type', 'application/json')
            .send({
                username,
                password: 'integrationPassword'
            });

        expect(response.status).toBe(201);
            
        const userRepository = getRepository(User);
        const user = await userRepository.findOneOrFail({ where: { username }});
        expect(user).toBeInstanceOf(User);
    })
});