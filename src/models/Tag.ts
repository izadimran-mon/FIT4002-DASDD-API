import {
  AfterLoad,
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { AdTag } from ".";
import { Ad } from "./Ad";

@Entity()
@Unique("tag_name_constraint", ["name"])
export class Tag extends BaseEntity {
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
    if (!this.adTags) return;
    this.ads = this.adTags.map((adTag) => adTag.ad);

    // Remove AdTag property to simplify result
    delete this.adTags;
    return;
  }
}
