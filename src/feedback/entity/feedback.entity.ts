import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength } from 'class-validator';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('feedback')
export class Feedback {
  @ApiProperty({
    description: `id`,
    example: '1',
  })
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: `Feedback text`,
    example: 'Some good text',
  })
  @IsString()
  @MaxLength(500)
  @Column({ length: 500 })
  text: string;

  @ManyToOne(() => User, (user) => user.feedbacks, { nullable: false })
  user: User;
}
