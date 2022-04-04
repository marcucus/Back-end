import { Site } from "src/sites/entities/site.entity";
import { User } from "src/users/entities/user.entity";
import { 
    Column, 
    Entity, 
    EntityRepository, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
    Repository 
} from "typeorm";


@Entity()
export class Keyword {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    keywords: string;

    @Column()
    position: number;
  
    @Column()
    lastPosition: number;

    @ManyToOne(() => Site, (site) => site.keywords)
    site: Site;

}

@EntityRepository(Keyword)
export class KeywordsRepository extends Repository<Keyword> {}
