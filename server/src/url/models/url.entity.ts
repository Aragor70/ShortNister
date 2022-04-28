import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('url')

export class UrlEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: true })
    author: string;

    @Column({ unique: true })
    urlCode: string;

    @Column()
    longUrl: string;

    @Column({ unique: true })
    shortUrl: string;

    @Column({ nullable: true, default: 0 })
    views: number;

    @Column({ nullable: true, default: null })
    lastVisit: Date;

    @Column({ default: new Date() })
    date: Date;

}