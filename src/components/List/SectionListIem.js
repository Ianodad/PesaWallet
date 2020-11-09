import React from 'react';
import {StyleSheet, Text, View, SectionList} from 'react-native';
import Transaction from '../Transaction';
import {DataModifier} from '../../_helpers/DataModifier';
import {nameTitleCase} from '../../_helpers/NameTitleCase';
// import {DateConverter} from '../../_helpers/DateConverter';
var dayjs = require('dayjs');

const SectionListIem = ({data, navigation}) => {
  function DateConverter(date, type) {
    if (type == 'full') {
      return dayjs(date, 'MM/DD/YY').format('dddd D MMMM YYYY');
    }
    return dayjs(date, 'MM/DD/YY').format('D MMM YYYY');
  }

  //   console.log(data);
  const sectionHeader = ({section}) => {
    return (
      <View style={styles.headerStyle}>
        <Text>{DateConverter(section.dateTitle, 'full')}</Text>
      </View>
    );
  };
  return (
    <View>
      {/* {DateConverter('7/10/2020')} */}
      <SectionList
        style={styles.transaction}
        sections={DataModifier(data)}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={sectionHeader}
        renderItem={({item}) => (
          <Transaction
            style={styles.transaction}
            id={item.ID}
            type={item.TYPE}
            name={nameTitleCase(item.NAME)}
            date={DateConverter(item.DATE)}
            // date={item.DATE}
            time={item.TIME}
            cost={item.COST}
            amount={item.AMOUNT}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
};

export default SectionListIem;

const styles = StyleSheet.create({
  headerStyle: {
    marginLeft: 10,
    flex: 1,
  },
});
