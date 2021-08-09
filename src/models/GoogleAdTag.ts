import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { GoogleAd, GoogleTag } from ".";

@Entity()
// TODO: cascade?
export class GoogleAdTag extends BaseEntity {
  @PrimaryColumn()
  adId!: string;

  @PrimaryColumn()
  tagId!: number;

  @ManyToOne(() => GoogleAd, (ad) => ad.adTags, { primary: true })
  @JoinColumn({ name: "adId" })
  ad!: GoogleAd;

  @ManyToOne(() => GoogleTag, (tag) => tag.adTags, { primary: true })
  @JoinColumn({ name: "tagId" })
  tag!: GoogleTag;
}
