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
import { AdTag, Bot } from ".";
import { Tag } from "./Tag";

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Bot, (bot) => bot.ads)
  @JoinColumn({ name: "botId" })
  bot?: Bot;

  @Column("uuid")
  botId?: string;

  @Column("timestamptz", {
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;

  @Column("varchar", { nullable: true })
  image?: string;

  @Column("varchar", { nullable: true })
  headline?: string;

  @Column("varchar", { nullable: true })
  html?: string;

  @Column("varchar", { nullable: true })
  adLink?: string;

  @Column("boolean", { nullable: true })
  loggedIn?: boolean;

  @Column("varchar", { nullable: true })
  seenOn?: string;

  @OneToMany(() => AdTag, (adToTag) => adToTag.ad)
  adTags?: AdTag[];

  tags?: Tag[];

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
