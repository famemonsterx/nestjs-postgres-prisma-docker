import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "src/prisma/prisma.service";
import * as process from "node:process";
import { UserEntity } from "src/users/entity/user.entity";
import { plainToInstance } from "class-transformer";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private configService: ConfigService) {}

  async create(createUserDto: CreateUserDto): Promise<number> {
    const roundsOfHashing: number = this.configService.get('roundsOfHashing')

    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );
    const user = await this.prisma.user.create({ data: createUserDto })
    return user.id;
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return plainToInstance(UserEntity, user)
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return plainToInstance(UserEntity, user)
  }
}