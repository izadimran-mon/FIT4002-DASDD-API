import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Ad, Tag } from ".";

@Entity()
// TODO: cascade?
export class AdTag {
  @PrimaryColumn()
  adId!: string;

  @PrimaryColumn()
  tagId!: number;

  @ManyToOne(() => Ad, (ad) => ad.adTags, { primary: true })
  @JoinColumn({ name: "adId" })
  ad!: Ad;

  @ManyToOne(() => Tag, (tag) => tag.adTags, { primary: true })
  @JoinColumn({ name: "tagId" })
  tag!: Tag;
}
