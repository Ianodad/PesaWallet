import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Type from './Type';


const TypeList = ({data, typesSummed, onSetType, onGetSummedTotal, selectColor}) => {
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
            selectColor={selectColor}
            amount={onGetSummedTotal(typesSummed, item.title) ? "K"+onGetSummedTotal(typesSummed, item.title): undefined }
            onSetType={() => onSetType(item.value, item.colors)}
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
