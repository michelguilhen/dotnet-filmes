import { Genre } from './genre.model';

export interface Film {
  id: number,
  title: string,
  director: string,
  synopsis: string,
  release: number,
  genre: Genre
}
