import { Column, Entity } from 'typeorm';

@Entity()
export class User {
  @Column({ name: 'google_id', unique: true })
  googleId: string;

  @Column({ nullable: false })
  name: string;

  @Column()
  email: string;
}
