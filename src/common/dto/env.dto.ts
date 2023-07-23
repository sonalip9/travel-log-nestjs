import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class EnvDto implements NodeJS.ProcessEnv {
  [key: string]: string;

  @IsString()
  @IsOptional()
  TZ?: string;

  @IsString()
  MONGO_DB: string;

  @IsString()
  JWT_SECRET: string;

  @IsNumberString()
  JWT_EXPIRES_IN: string;
}
