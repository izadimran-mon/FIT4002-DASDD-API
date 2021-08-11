import {
  AfterLoad,
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { TwitterAdTag, TwitterBot } from ".";
import { TwitterTag } from "./TwitterTag";

@Entity()
export class TwitterAd extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => TwitterBot, (bot) => bot.ads)
  @JoinColumn({ name: "botId" })
  bot?: TwitterBot;

  @Column("uuid")
  botId?: string;

  @Column("timestamptz", {
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;

  @Column("varchar")
  promoterHandle?: string;

  @Column("varchar", { nullable: true })
  content?: string;

  @Column("varchar", { nullable: true })
  image?: string;

  @Column("varchar", { nullable: true })
  adLink?: string;

  @OneToMany(() => TwitterAdTag, (adToTag) => adToTag.ad)
  adTags?: TwitterAdTag[];

  tags?: TwitterTag[];

  @AfterLoad()
  private setTags() {
    if (!this.adTags) return;

    // Flatten join result with AdTag entity
    // Note: might be better to do this on the database side
    this.tags = this.adTags.map((adTag) => adTag.tag);

    // Remove AdTag property to simplify result
    delete this.adTags;
  }
}
