import { axiosInstance } from '../api';

import { IMovie } from '@/types/movie';

export interface IGetMoviesResponse {
  dates: {
    maximum: Date;
    minimun: Date;
  };
  page: number;
  results: IMovie[];
}

type TGetMovies = (args: {
  query: string;
  page?: number;
}) => Promise<IGetMoviesResponse>;

type TGetMovieById = (args: { id: string }) => Promise<IMovie>;

export const getMovies: TGetMovies = async ({ query, page }) => {
  const { data } = await axiosInstance.get(
    `/${query}?page=${page ?? 1}&api_key=7d79485817123eb0026c00028f08ed4b`
  );
  return data;
};

export const getMovieById: TGetMovieById = async ({ id }) => {
  const { data } = await axiosInstance.get(
    `/${id}?api_key=7d79485817123eb0026c00028f08ed4b&append_to_response=videos`
  );
  return data;
};

export const getMovieSimilar: TGetMovies = async ({ query }) => {
  const { data } = await axiosInstance.get(
    `/${query}/similar?api_key=7d79485817123eb0026c00028f08ed4b`
  );
  return data;
};
