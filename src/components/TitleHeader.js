import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NumberCommas} from '../_helpers/NumberCommas';
import Text from '../components/Text';
import colors from '../config/colors';
import defaultStyles from '../config/styles';

const TitleHeader = ({
  home,
  title,
  phoneNo,
  creditSum,
  debitSum,
  creditLength,
  debitLength,
  filter,
  color,
}) => {
  return (
    <View style={[styles.container, {backgroundColor: colors[color]}]}>
      <View style={styles.Title}>
        {home && <Text style={styles.greeting}>Hello</Text>}
        <Text style={styles.title}>{title}</Text>
        {/* <Text>{caller}</Text> */}
        {filter && <Text style={styles.number}>{phoneNo}</Text>}
      </View>
      {filter && (
        <View style={styles.details}>
          <View style={styles.sentNo}>
            <Text style={{fontWeight: 'bold', color: '#848ac2'}}>
              Received {creditLength}
            </Text>
            <Text style={[styles.credit, {color: colors.Credit}]}>
              {NumberCommas(creditSum) + '/='}
            </Text>
          </View>
          <View style={styles.receiveNo}>
            <Text style={{fontWeight: 'bold', color: '#848ac2'}}>
              Sent {debitLength}
            </Text>
            <Text style={[styles.debit, {color: colors.Debit}]}>
              {NumberCommas(debitSum) + '/='}
            </Text>
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
    // backgroundColor: colors.medium,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  greeting: {
    fontSize: 20,
    textShadowColor: 'blue',
    textShadowOffset: {width: 1, height: -1.3},
    textShadowRadius: 1,
    fontWeight: 'bold',
  },
  title: {
    fontSize: defaultStyles.headerLarge.fontSize,
    // fontSize: 30,
    color: 'white',
    textShadowColor: 'blue',
    textShadowOffset: {width: 1, height: -1.3},
    textShadowRadius: 1,
    fontWeight: 'bold',
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
  credit: {
    fontSize: defaultStyles.textLarge.fontSize,
    // fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'green',
    textShadowOffset: {width: 0.7, height: -0.7},
    textShadowRadius: 1,
  },
  debit: {
    fontWeight: 'bold',
    textShadowColor: 'blue',
    textShadowOffset: {width: 0.7, height: -0.7},
    textShadowRadius: 1,
  },
  receiveNo: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default TitleHeader;
