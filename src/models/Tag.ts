import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AdToTag } from ".";

@Entity()
export class Tag {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  // If tag is not user-generated but is predefined, should use enum instead
  @Column()
  name!: string;

  @OneToMany(() => AdToTag, (adToTag) => adToTag.tag)
  adToTags!: AdToTag[];
}
