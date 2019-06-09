import { DeleteResult, Connection } from "typeorm";
import app from './app';
import * as request from "supertest";
import * as fs from 'fs'


export async function login(username: string,  password: string): Promise<string> {
    const response = await request(app)
        .post('/auth/login')
        .set('Content-Type', 'application/json')
        .send({
            username,
            password
        });

    return Promise.resolve(response.body.token);
}

export async function deleteAll(connection: Connection, entity: any): Promise<DeleteResult> {
    return await connection
        .createQueryBuilder()
        .delete()
        .from(entity)
        .execute();
}

export async function loadFixtures(connection: Connection, name: string): Promise<any> {
    const file: any = JSON.parse(fs.readFileSync(`${__dirname}/test/fixtures/${name}.json`, 'utf8'));

    const data: Record<string, any>[] = file.data;
    if(!data) {
        return;
    }

    const entityName: string = file.entity;
    await connection.createQueryBuilder().insert().into(entityName).values(data).execute();
}