import { Injectable } from '@nestjs/common';
import { RentProduct } from 'src/rentProducts/entities/rentProducts.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Rent } from 'src/rent/entities/rent.entity';

@Injectable()
export class DatasourceService {
  private rentProducts: RentProduct[] = [
    {
      id: 1,
      name: 'bike',
      description: '123',
      prices: [100, 200, 300],
    },
  ];

  private feedback: Feedback[] = [];

  private rents: Rent[] = [];

  getRentProducts(): RentProduct[] {
    return this.rentProducts;
  }

  getFeedbacks(): Feedback[] {
    return this.feedback;
  }

  getRents(): Rent[] {
    return this.rents;
  }
}
