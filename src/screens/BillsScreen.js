import React from 'react';
import Text from '../components/Text';
import Screen from '../components/Screen';
import colors from '../config/colors';
import {StyleSheet, View, FlatList} from 'react-native';
import {color} from 'react-native-reanimated';
import Card from '../components/Card';
import {bills} from '../services/billingSource';
import defaultStyles from '../config/styles';


import {messages} from '../services/messagesCollection';
import TransactionList from '../components/TransactionList';

const BillsScreen = ({navigation}) => {
  return (
    <Screen navigation={navigation} style={styles.screen} menu>
      <View style={styles.header}>
        <Text style={styles.title}>Billing Subscriptions</Text>
      </View>
      <View style={styles.body}>
        <FlatList
          data={bills}
          keyExtractor={(bill) => bill.id.toString()}
          renderItem={({item}) => (
            <Card
              style={styles.card}
              title={item.title}
              gradient
              gradientColors={['#5a60f8', '#5a60f8', '#8387f9']}
            />
          )}
        />
        {/* <TransactionList
          sectionList={true}
          navigation={navigation}
          data={messages}
        /> */}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: defaultStyles.colors.white,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  title: {},
  body: {
    flex: 4,
  },
});

export default BillsScreen;
