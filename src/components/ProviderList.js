import React from 'react';

import {StyleSheet, View, FlatList, ScrollView, Dimensions} from 'react-native';
import {NumberCommas} from '../_helpers/NumberCommas';
import {sources} from '../services/sources';
import Card from './Card';

const ProviderList = ({navigation}) => {
  return (
    <>
      <FlatList
        data={sources}
        keyExtractor={source => source.id.toString()}
        renderItem={({item}) => (
          <Card
            style={styles.card}
            gradient
            gradientColors={item.color}
            title={item.title}
            balance={'Ksh' + NumberCommas(item.balance)}
            logo={item.logo}
            onPress={() => navigation.navigate('SourceDetails', item)}
          />
        )}
      />
    </>
  );
};

export default ProviderList;

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
  },
});
