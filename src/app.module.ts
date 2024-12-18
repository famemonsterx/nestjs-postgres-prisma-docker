import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/users.module";
import { ConfigModule } from "@nestjs/config";
import configuration from "src/config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),
    PrismaModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
