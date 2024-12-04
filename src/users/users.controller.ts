import { UsersService } from "src/users/users.service";
import { Controller, Get, Logger, Param, ParseIntPipe, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserEntity } from "src/users/entity/user.entity";
import { AuthGuard } from "src/guards/auth.guard";

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Req() req) {
    Logger.log(JSON.stringify(req.user))
    const userId = req.user.userId
    return await this.usersService.findOne(userId);
  }
}