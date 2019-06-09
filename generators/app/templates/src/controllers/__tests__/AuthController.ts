import { Connection } from 'typeorm';
import { createTypeormConn } from '../../lib/typeorm';
import * as request from "supertest";
import app from '../../lib/app';
import { login, loadFixtures, deleteAll } from '../../lib/testUtils';

describe("AuthController integration test", (): void => {
    beforeAll(async (): Promise<void> => {
        const connection: Connection = await createTypeormConn();
        await deleteAll(connection, 'User');
        await loadFixtures(connection, 'users');
    });

    it('should return user token', async (): Promise<void> => {
        const username = 'integrationTest';
        const response = await request(app)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                username,
                password: 'integrationPassword'
            });

        expect(response.status).toBe(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.token).not.toBe(null);
    });

    it('should change user password', async (): Promise<void> => {
        const token = await login('integrationTest', 'integrationPassword');
        const response = await request(app)
            .post('/auth/change-password')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .send({
                oldPassword: 'integrationPassword',
                newPassword: 'newIntegrationPassword'
            });

        expect(response.status).toBe(204);
    });
});