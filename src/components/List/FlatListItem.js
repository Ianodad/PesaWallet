import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Transaction from '../Transaction';
import {nameTitleCase} from '../../_helpers/NameTitleCase';
import defaultStyles from '../../config/styles';

const FlatListItem = ({data, navigation}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(type) => type.ID.toString()}
      renderItem={({item}) => (
        <Transaction
          style={styles.transaction}
          id={item.ID}
          phoneNo={item.PHONENO}
          type={item.TYPE}
          name={nameTitleCase(item.NAME)}
          date={item.DATE}
          time={item.TIME}
          cost={item.COST}
          amount={item.AMOUNT}
          finance={item.FINANCE}
          navigation={navigation}
        />
      )}
    />
  );
};

export default FlatListItem;

const styles = StyleSheet.create({
  transaction: {
    flexDirection: 'row',
    marginHorizontal: 10,
    shadowColor: '#FFFFFF',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 16,
    // JustifyContent: 'space-between',
  },
});
