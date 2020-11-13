import React from 'react';
import Text from '../components/Text';
import {StyleSheet, View} from 'react-native';
import colors from '../config/colors';

const TitleHeader = ({home, filter}) => {
  return (
    <View style={styles.container}>
      <View style={styles.Title}>
        {home && <Text style={styles.greeting}>Hello</Text>}
        <Text style={styles.name}>Joe Dancan</Text>
        {/* <Text>{caller}</Text> */}
        {filter && <Text style={styles.number}>0712725144</Text>}
      </View>
      {filter && (
        <View style={styles.details}>
          <View style={styles.sentNo}>
            <Text>Sent 13</Text>
            <Text>Ksh3000</Text>
          </View>
          <View style={styles.receiveNo}>
            <Text>Received 19</Text>
            <Text>Ksh7000</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingLeft: 30,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  name: {
    fontSize: 24,
  },
  number: {
    fontSize: 20,
  },
  details: {
    flexDirection: 'row',
  },
  sentNo: {
    flex: 1,
    flexDirection: 'column',
  },
  receiveNo: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default TitleHeader;
