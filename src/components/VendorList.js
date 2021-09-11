import React from 'react';

import {StyleSheet, View, FlatList, ScrollView, Dimensions} from 'react-native';
import {NumberCommas} from '../_helpers/NumberCommas';
import Card from '../components/Card';
import {sources} from '../services/sources';

const VendorList = ({navigation}) => {
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

export default VendorList;

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
