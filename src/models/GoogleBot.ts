import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { GoogleAd } from ".";

@Entity()
export class GoogleBot extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  username!: string;

  @Column("timestamptz")
  dob!: Date;

  @Column("varchar")
  gender!: string;

  @Column("varchar")
  fName!: string;

  @Column("varchar")
  lName!: string;

  @Column("int")
  otherTermsCategory!: number;

  @Column("varchar")
  password!: string;

  @Column("float")
  locLat!: number;

  @Column("float")
  locLong!: number;

  @Column("varchar")
  type!: string;

  @Column("int")
  politicalRanking!: number;

  @OneToMany(() => GoogleAd, (ad) => ad.bot)
  ads!: GoogleAd[];
}
