import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User as UserEntity } from "../typeorm";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/CreateUser.dto";
import {encodePassword} from "../utils/bcrypt";


@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    async createUser(dto: CreateUserDto){
       const checkUser = await this.userRepository.findOneBy({email: dto.email})

       if(checkUser) throw new HttpException("A user with this email already exists", HttpStatus.FORBIDDEN);

       const hashPassword = encodePassword(dto.password);
       const newUser = this.userRepository.create({
           ...dto,
           password: hashPassword,
       })

       return this.userRepository.save(newUser)

    }

    getAllUsers(){
        return this.userRepository.find()
    }

    getOneByEmail(email: string){
        return this.userRepository.findOneBy({email: email})
    }

    getOneById(id){
        return this.userRepository.findOneBy({id: id})
    }



}
