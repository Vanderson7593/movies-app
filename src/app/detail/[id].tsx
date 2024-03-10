import { EvilIcons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { Link, useLocalSearchParams } from 'expo-router';
import { FC, useRef } from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';
import WebView from 'react-native-webview';
import { useQuery } from 'react-query';

import Movie from '@/components/movie';
import { getMovieById, getMovieSimilar } from '@/services/tmdb';

const MovieDetail: FC = () => {
  const video = useRef(null);
  const { id } = useLocalSearchParams();
  const { data } = useQuery(['movie', id], () =>
    getMovieById({ id: id as string })
  );
  const { data: similarData } = useQuery(['movie', 'similar', id], () =>
    getMovieSimilar({ query: id as string })
  );

  return (
    <View className="flex-col relative">
      <Link href="../" asChild>
        <Pressable className="absolute top-4 right-4 z-10">
          <EvilIcons size={26} name="close-o" color="#FFF" />
        </Pressable>
      </Link>

      <View className="h-96 w-full">
        <WebView
          ref={video}
          style={{ top: -72 }}
          javaScriptEnabled
          source={{
            uri: `https://www.youtube.com/embed/${data?.videos.results[0].key}?rel=0&autoplay=0&showinfo=0&controls=1 &fs=0`,
          }}
          useWebKit
          allowsFullscreenVideo={false}
          allowsInlineMediaPlayback
          allowsBackForwardNavigationGestures
        />
      </View>

      <View className="px-2 mt-[-70px]">
        <Text className="text-white text-2xl font-bold">{data?.title}</Text>
        <Text className="text-white">Release date: {data?.release_date}</Text>
        <Text className="text-white mt-2">{data?.overview}</Text>

        <View className="mt-2 flex-row space-x-2">
          {data?.genres.map(g => (
            <View key={g.id} className="rounded-lg bg-white p-1">
              <Text>{g.name}</Text>
            </View>
          ))}
        </View>

        <View>
          <Text className="text-white text-lg font-bold my-2">
            Similar movies
          </Text>

          {!!similarData?.results.length && (
            <View
              style={{ minHeight: 340, width: Dimensions.get('screen').width }}>
              <FlashList
                data={similarData.results}
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
    </View>
  );
};

export default MovieDetail;
