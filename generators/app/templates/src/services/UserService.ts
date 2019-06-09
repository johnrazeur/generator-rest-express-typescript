import { User } from "../entities/User";
import { validate } from "class-validator";
import { getRepository } from "typeorm";


export class UserService {
    public async create(username: string, password: string): Promise<User|Record<string, string>> {
        //Get parameters from the body
        let user = new User();
        user.username = username;
        user.password = password;

        //Validade if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
            return Promise.reject({ name: 'UserNotValid', message: 'parameter not valid'});
        }

        //Hash the password, to securely store on DB
        user.hashPassword();

        //Try to save. If fails, the username is already in use
        const userRepository = getRepository(User);
        try {
            await userRepository.save(user);
        } catch (e) {
            return Promise.reject({ name: 'UsernameExist', message: 'username already exist'});
        }

        //If all ok, send 201 response
        return Promise.resolve(user);
    }
}