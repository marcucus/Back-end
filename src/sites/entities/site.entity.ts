import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  EntityRepository,
  Repository,
} from 'typeorm';

@Entity()
export class Sites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  position: number;

  @Column()
  lastPosition: number;
}

@EntityRepository(Sites)
export class SitesRepository extends Repository<Sites> {}
