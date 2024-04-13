import { Injectable } from '@nestjs/common';
import { RentProduct } from 'src/rentProducts/entities/rentProducts.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Rent } from 'src/rent/entities/rent.entity';

@Injectable()
export class DatasourceService {
  private rentProducts: RentProduct[] = [
    {
      id: 1,
      name: 'Детский велосипед',
      description: '(до 12 лет)',
      image: 'kids_bike.webp',
      prices: [150, 350, 450],
    },
    {
      id: 2,
      name: 'Любительский велосипед',
      description: '',
      image: 'amateur_bike.webp',
      prices: [300, 450, 600],
    },
    {
      id: 3,
      name: 'Электросамокат',
      description: '(с 16 лет)',
      image: 'electric_scooter.webp',
      prices: [400, 700, 1000],
    },
    {
      id: 4,
      name: 'Веломобиль',
      description: '',
      image: 'velomobile.webp',
      prices: [300, 500, 700],
    },
    {
      id: 5,
      name: 'Ролики',
      description: '',
      image: 'roller_skates.webp',
      prices: [200, 300, 450],
    },
    {
      id: 6,
      name: 'Лонгборд',
      description: '',
      image: 'longboard.webp',
      prices: [170, 300, 420],
    },
  ];

  private feedback: Feedback[] = [
    {
      id: 1,
      first_name: 'Максим',
      last_name: 'Петров',
      gender: 'male',
      text: 'Отличный выбор для активного отдыха! Брал ролики на выходные, чтобы разнообразить свой досуг, и не пожалел. Сервис проката работает четко, цены адекватные, а обслуживание на высшем уровне. Буду рекомендовать друзьям и обязательно ещё вернусь!',
    },
    {
      id: 2,
      first_name: 'Иван',
      last_name: 'Иванов',
      gender: 'male',
      text: 'Прокат роликов и самокатов - просто супер! Взял ролики на выходные с друзьями, и мы просто наслаждались скоростью и свежим воздухом. Оборудование в отличном состоянии, персонал дружелюбный и предупредительный. Очень рекомендую!',
    },
    {
      id: 3,
      first_name: 'Екатерина',
      last_name: 'Смирнова',
      gender: 'female',
      text: 'Очень довольна сервисом проката роликов и самокатов! Быстрая и удобная аренда, ассортимент разнообразный. Взяла самокат для прогулки по городу, и это было просто восхитительно! Чисто, уютно и надежно. Спасибо за замечательное время!',
    },
  ];

  private rents: Rent[] = [
    {
      id: 1,
      first_name: 'Максим',
      last_name: 'Петров',
      date: '30 Марта',
      time: '12:00',
    },
    {
      id: 2,
      first_name: 'Иван',
      last_name: 'Иванов',
      date: '27 Марта',
      time: '17:00',
    },
    {
      id: 3,
      first_name: 'Екатерина',
      last_name: 'Смирнова',
      date: '28 Марта',
      time: '16:00',
    },
  ];

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
