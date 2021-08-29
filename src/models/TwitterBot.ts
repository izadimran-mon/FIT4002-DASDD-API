import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TwitterAdSeenByBot } from ".";

@Entity()
export class TwitterBot extends BaseEntity {
  @PrimaryColumn("varchar")
  id!: string;

  @Column("varchar")
  username!: string;

  @Column("int")
  politicalRanking!: number;

  @OneToMany(() => TwitterAdSeenByBot, (adToTag) => adToTag.bot)
  adBot?: TwitterAdSeenByBot[];
}
