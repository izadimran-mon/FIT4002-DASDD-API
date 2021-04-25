import {
  AfterLoad,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AdTag } from ".";
import { Ad } from "./Ad";

@Entity()
export class Tag {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  // If tag is not user-generated but is predefined, should use enum instead
  @Column()
  name!: string;

  @OneToMany(() => AdTag, (adToTag) => adToTag.tag)
  adTags?: AdTag[];

  ads!: Ad[];

  @AfterLoad()
  private setAds() {
    // Flatten join result with AdTag entity
    // Note: might be better to do this on the database side
    this.ads = this.adTags ? this.adTags.map((adTag) => adTag.ad) : [];

    // Remove AdTag property to simplify result
    delete this.adTags;
  }
}
