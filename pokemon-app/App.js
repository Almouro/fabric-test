/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {memo, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {pokemonData} from './pokemonData';

// Taken directly from https://github.com/MatheusPires99/pokedex
const POKEMON_TYPE_COLORS = {
  normal: '#A8A878',
  fighting: '#C03028',
  flying: '#A890F0',
  poison: '#A040A0',
  ground: '#E0C068',
  rock: '#B8A038',
  bug: '#A8B820',
  ghost: '#705898',
  steel: '#B8B8D0',
  fire: '#FA6C6C',
  water: '#6890F0',
  grass: '#48CFB2',
  electric: '#FFCE4B',
  psychic: '#F85888',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  fairy: '#EE99AC',
};

const PokemonCard = memo(({item}) => {
  const data = pokemonData[item.url];

  return (
    <View style={{width: '50%'}}>
      <View
        style={{
          backgroundColor: data
            ? POKEMON_TYPE_COLORS[data.types[0].type.name]
            : '#eee',
          padding: 10,
          paddingRight: 0,
          margin: 5,
          borderRadius: 10,
          elevation: 7,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            paddingRight: 10,
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              color: 'white',
              fontWeight: 'bold',
              flex: 1,
              paddingRight: 5,
            }}>
            {item.name.toUpperCase()} {item.name.toUpperCase()}
          </Text>
          {data ? (
            <Text style={{fontSize: 12, color: '#6666'}}>
              #{data.game_indices[0]?.game_index}
            </Text>
          ) : null}
        </View>
        {data ? (
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 1, paddingTop: 20}}>
              {data.types.map(({type}) => (
                <View
                  key={type.name}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#6662',
                    borderRadius: 10,
                    marginTop: 5,
                    padding: 5,
                  }}>
                  <Text style={{color: '#fffa'}}>{type.name}</Text>
                </View>
              ))}
            </View>
            <Image
              source={{uri: data.sprites.other.home.front_default}}
              style={{width: 100, height: 100}}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
});

const renderItem = ({item, index}) => {
  return <PokemonCard item={item} />;
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=1000',
      );
      setData((await response.json()).results);
    };

    loadData();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <FlatList
        numColumns={2}
        keyExtractor={item => item.url}
        data={data}
        renderItem={renderItem}
        contentContainerStyle={{paddingHorizontal: 5}}
      />
    </SafeAreaView>
  );
};

export default App;
