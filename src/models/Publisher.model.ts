import { Comic } from './Comic.model';

export interface Publisher {
  id: number;
  name: string;
  comics?: Comic[];
  createdAt: Date;
  updatedAt: Date;
}
