import { AuthService } from "src/auth/auth.service";
import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthEntity } from "src/auth/entity/auth.entity";
import { LoginDto } from "src/auth/dto/login.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService, private jwtService: JwtService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Post('register')
  @ApiOkResponse({ type: AuthEntity })
  async register(@Body() data: CreateUserDto) {
    const exists = await this.usersService.findByEmail(data.email);
    if (exists?.email) {
      throw new BadRequestException("User already exists");
    }
    const id = this.usersService.create(data)
    return { access_token: this.jwtService.sign({ userId: id }) }
  }
}