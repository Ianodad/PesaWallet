import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Type from './Type';

const TypeList = ({data, onSetType}) => {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={data}
        contentInset={{margin: 16}}
        horizontal
        keyExtractor={(icon) => icon.id.toString()}
        renderItem={({item}) => (
          <Type
            style={styles.type}
            image={item.image}
            title={item.title}
            amount={item.amount}
            onSetType={() => onSetType(item.value)}
          />
        )}
      />
    </View>
  );
};

export default TypeList;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginVertical: 5,
    marginLeft: 10,
    height: 55,
  },
  button: {
    // backgroundColor: colors.medium,
    paddingVertical: 5,
    marginHorizontal: 5,
    width: 70,
    height: 70,
  },
});
