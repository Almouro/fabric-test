import React, {memo} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface Pokemon {
  gameIndex: string;
  name: string;
  types: {name: string}[];
  imageUrl: string;
}

// Taken directly from https://github.com/MatheusPires99/pokedex
const POKEMON_TYPE_COLORS: {[type: string]: string} = {
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

const pokedex: Pokemon[] = require('./pokedex.json');

const cardStyles = StyleSheet.create({
  container: {width: '50%'},
  innerContainer: {
    padding: 10,
    paddingRight: 0,
    margin: 5,
    borderRadius: 10,
    elevation: 7,
  },
  name: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
    paddingRight: 5,
  },
  typeContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6662',
    borderRadius: 10,
    marginTop: 5,
    padding: 5,
  },
  nameAndIndexContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  index: {fontSize: 12, color: '#6666'},
  type: {color: '#fffa'},
  image: {width: 100, height: 100},
  typesContainer: {flex: 1, paddingTop: 20},
  typeRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});

const PokemonCard = memo(({item}: {item: Pokemon}) => {
  return (
    <View style={cardStyles.container}>
      <View
        style={[
          cardStyles.innerContainer,
          {
            backgroundColor: POKEMON_TYPE_COLORS[item.types[0].name],
          },
        ]}>
        <View style={cardStyles.nameAndIndexContainer}>
          <Text numberOfLines={1} style={cardStyles.name}>
            {item.name.toUpperCase()}
          </Text>
          <Text style={cardStyles.index}>#{item.gameIndex}</Text>
        </View>
        <View style={cardStyles.typeRow}>
          <View style={cardStyles.typesContainer}>
            {item.types.map(type => (
              <View key={type.name} style={cardStyles.typeContainer}>
                <Text style={cardStyles.type}>{type.name}</Text>
              </View>
            ))}
          </View>
          <Image source={{uri: item.imageUrl}} style={cardStyles.image} />
        </View>
      </View>
    </View>
  );
});

const renderItem = ({item}: {item: Pokemon}) => {
  return <PokemonCard item={item} />;
};

const styles = StyleSheet.create({list: {paddingHorizontal: 5}});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <FlatList
        numColumns={2}
        keyExtractor={item => item.name}
        data={pokedex}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

export default App;
