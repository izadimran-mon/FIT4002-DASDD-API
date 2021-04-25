import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Ad, Tag } from ".";

@Entity()
@Unique("adtag_key", ["adId", "tagId"])
export class AdToTag {
  @PrimaryGeneratedColumn("increment")
  adToTagId!: number;

  @Column()
  adId!: string;

  @Column()
  tagId!: number;

  @OneToMany(() => Tag, (tag) => tag.adToTags)
  tag!: Tag;

  @OneToMany(() => Ad, (ad) => ad.adToTags)
  ad!: Ad;
}
