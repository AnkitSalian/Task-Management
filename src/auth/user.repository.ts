import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const exists = this.findOne({ username });

        if (exists) {

        }
        const user = new User();
        user.username = username;
        user.password = password;

        try {
            await user.save();
        } catch (error) {
            
            if (parseInt(error.code) === 23505) {
                throw new ConflictException(`User with name "${username}" already exists`);
            } else {
                throw new InternalServerErrorException();
            }
            
        }

    }
}