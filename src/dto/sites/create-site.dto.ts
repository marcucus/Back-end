import { User } from "src/entities/user.entity";

export class CreateSiteDto {
  id: number;
  url: string;
  userId: User;
}
