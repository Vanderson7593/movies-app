import { Link } from 'expo-router';
import { FC } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { IMovie } from '@/types/movie';

const Movie: FC<{ movie: IMovie }> = ({ movie }) => {
  return (
    <Link href={`/detail/${movie.id}`} asChild>
      <Pressable>
        <View className="flex">
          <Image
            className="w-48 h-80 rounded-2xl"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />
        </View>
      </Pressable>
    </Link>
  );
};

export default Movie;
