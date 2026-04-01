import { Comic } from './Comic.model';

export interface Person {
  id: number;
  name: string;
  isWritter: boolean;
  isDrawer: boolean;
  writtenComics?: Comic[];
  drawnComics?: Comic[];
  createdAt: Date;
  updatedAt: Date;
}
