import {Repository} from "typeorm";
import {User} from "../entity/User";
import {AppDataSource} from "../data-source";

class UserDAO {
    private userRepository: Repository<User>

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    public async doesUserExist(Username: string): Promise<Boolean> {
        const user = await this.userRepository.findOne({ where: { username: Username } })
        return user !== null
    }

    public async getUserByName(Username: string): Promise<User> {
        return await this.userRepository.findOne({ where: { username: Username } })
    }

    public async saveUser(username: string, password: string){
        const user = new User();
        user.username = username;
        user.password = password;
        await this.userRepository.save(user)
    }
}

export default UserDAO