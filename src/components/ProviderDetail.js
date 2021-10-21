import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from './Text';
import TitleHeader from './TitleHeader';

const ProviderDetail = ({Title}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{Title}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.text}>Balance</Text>
          <Text style={styles.textPrice}>2000</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Total</Text>
          <Text style={styles.textPrice}>9000</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Weekly Sent</Text>
          <Text style={styles.textPrice}>3000</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Weekly: Received</Text>
          <Text style={styles.textPrice}>3000</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Weekly Average</Text>
          <Text style={styles.textPrice}>3000</Text>
        </View>
      </View>
    </View>
  );
};

export default ProviderDetail;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    marginVertical: 10,
    paddingVertical: 10,
    // alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    width: 300,
    alignItems: 'center',
    // marginHorizontal: 10,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: 25,
  },
  title: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    alignItems: 'center',
  },
  textPrice: {
    fontSize: 15,
    justifyContent: 'flex-end',
  },
  text: {
    color: '#000',
    fontSize: 16,
    marginVertical: 10,
    fontWeight: 'bold',
    // marginHorizontal: 25,
  },
});
