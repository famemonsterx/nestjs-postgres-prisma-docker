import { UsersService } from "src/users/users.service";
import { UsersController } from "src/users/users.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { forwardRef, Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    PrismaModule,
    ConfigModule,
    forwardRef(() => AuthModule)
  ],
  exports: [UsersService],
})
export class UsersModule {}