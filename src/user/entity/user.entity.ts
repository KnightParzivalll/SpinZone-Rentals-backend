import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Rent } from 'src/rent/entity/rent.entity';
import { Feedback } from 'src/feedback/entity/feedback.entity';

import { IsIn, IsNumber, IsString, MaxLength } from 'class-validator';

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export const genderValues: Gender[] = Object.values(Gender);

@Entity('user')
export class User {
  @ApiProperty({
    description: `User's id`,
    example: '1',
  })
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: `User's first name`,
    example: 'James',
  })
  @Column({ length: 50 })
  @IsString()
  @MaxLength(50)
  first_name: string;

  @ApiProperty({
    description: `User's last name`,
    example: 'Roberts',
  })
  @Column({ length: 50 })
  @IsString()
  @MaxLength(50)
  last_name: string;

  @ApiProperty({
    enum: genderValues,
    description: `User's gender`,
    example: 'male',
  })
  @Column({
    type: 'enum',
    enum: genderValues,
  })
  @IsIn(genderValues)
  gender: Gender;

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedbacks: Feedback[];

  @OneToMany(() => Rent, (rent) => rent.user)
  rents: Rent[];
}
