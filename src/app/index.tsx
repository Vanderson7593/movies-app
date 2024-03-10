import { FlashList } from '@shopify/flash-list';
import { useMemo } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { useQueries } from 'react-query';

import Movie from '@/components/movie';
import { IGetMoviesResponse, getMovies } from '@/services/tmdb';

const QUERIES = [
  {
    queryKey: ['movies', 1],
    queryFn: () => getMovies({ query: 'popular', page: 1 }),
  },
  {
    queryKey: ['movies', 2],
    queryFn: () => getMovies({ query: 'popular', page: 2 }),
  },
];

export default function Home() {
  const [pageOneRes, pageTwoRes] = useQueries(QUERIES);

  const pageOne = useMemo(
    () => (pageOneRes?.data as IGetMoviesResponse)?.results,
    [pageOneRes]
  );
  const pageTwo = useMemo(
    () => (pageTwoRes?.data as IGetMoviesResponse)?.results,
    [pageOneRes]
  );

  return (
    <View className="px-4 pt-[60px]">
      <View className="flex-col">
        <Text className="text-white text-lg font-bold mb-6 mt-4">
          Top popular movies
        </Text>
        {pageOne && (
          <View
            style={{ minHeight: 340, width: Dimensions.get('screen').width }}>
            <FlashList
              data={pageOne}
              ItemSeparatorComponent={() => <View className="w-2" />}
              horizontal
              renderItem={({ item, index }) => (
                <Movie key={index} movie={item} />
              )}
              estimatedItemSize={20}
            />
          </View>
        )}
      </View>

      <View className="flex-col">
        <Text className="text-white text-lg font-bold my-4">See more</Text>
        {pageTwo && (
          <View
            style={{ minHeight: 340, width: Dimensions.get('screen').width }}>
            <FlashList
              data={pageTwo}
              ItemSeparatorComponent={() => <View className="w-2" />}
              horizontal
              renderItem={({ item, index }) => (
                <Movie key={index} movie={item} />
              )}
              estimatedItemSize={20}
            />
          </View>
        )}
      </View>
    </View>
  );
}
