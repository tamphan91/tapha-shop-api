import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Base } from '../common/base.entity';
import { Profile } from '../profile/profile.entity';

@Entity()
export class Google extends Base {

  @Column('text')
  thirdPartyId: string;

  @Column({unique: true})
  profileId: number;

  @OneToOne(type => Profile, profile => profile.user)
  @JoinColumn()
  profile: Profile;
}
