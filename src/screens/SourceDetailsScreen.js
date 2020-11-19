import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Screen from '../components/Screen';
import TypeList from '../components/TypeList';
import VisualChart from '../components/VisualChart';
import color from '../config/colors';
import TransactionList from '../components/TransactionList';
import {messages} from '../services/messagesCollection';
import LinearGradient from 'react-native-linear-gradient';

const SourceDetails = ({route, navigation}) => {
  const details = route.params;
  return (
    <Screen navigation={navigation} style={styles.screen} menu>
      <LinearGradient
        start={{x: 0, y: 0.8}}
        end={{x: 0.5, y: 0.1}}
        style={styles.header}
        colors={['#8387f9', '#5a60f8']}>
        <VisualChart />
      </LinearGradient>
      <View style={styles.body}>
        <TypeList />
        <TransactionList
          flatList={true}
          navigation={navigation}
          data={messages}
        />
      </View>
    </Screen>
  );
};

export default SourceDetails;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: color.white,
  },
  header: {
    backgroundColor: color.primary,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    flex: 4,
  },
  body: {
    backgroundColor: color.white,
    flex: 5,
    flexDirection: 'column',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});
