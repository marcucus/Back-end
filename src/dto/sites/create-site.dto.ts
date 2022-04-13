import { User } from "src/entities/user.entity";

export class CreateSiteDto {
  id: string;
  url: string;
  userId: User;
}
