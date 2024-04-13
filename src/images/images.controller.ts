import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  @Get(':imageName')
  @ApiResponse({
    status: 200,
    description: 'Returns the requested image file.',
    schema: { type: 'string', format: 'binary' },
  })
  getImage(@Param('imageName') imageName: string, @Res() res: Response) {
    const imagePath = join(__dirname, '..', '..', 'uploads', imageName);
    return res.sendFile(imagePath);
  }
}
