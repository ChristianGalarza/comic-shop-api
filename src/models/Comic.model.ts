import { Person } from './Person.model';
import { Publisher } from './Publisher.model';

export interface Comic {
  id: string | number;
  title: string;
  description: string;
  stock: string;
  preorders: number;
  price: number;
  imageUrl: string;
  writerId: number;
  writer?: Person;
  draweId: number;
  drawer?: Person;
  publisherId: number;
  publisher?: Publisher;
  releaseDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
