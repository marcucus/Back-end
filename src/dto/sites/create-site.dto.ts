import { User } from "../../entities/user.entity";

export class CreateSiteDto {
  id: string;
  url: string;
  userid: User;
}
