/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  FlatList,
  ScrollView,
  SafeAreaView,
  VirtualizedList,
  TouchableOpacity,
} from 'react-native';

import colors from '../config/colors';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import {LogBox} from 'react-native';

import Transaction from '../components/Transaction';
import TitleHeader from '../components/TitleHeader';
import Text from '../components/Text';
import {nameTitleCase} from '../_helpers/NameTitleCase';
import {messages} from '../services/messagesCollection';
// import {ScrollView} from 'react-native-gesture-handler';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const renderNavBar = () => (
  <View style={styles.navContainer}>
    <View style={styles.statusBar} />
    <View style={styles.navBar}>
      <TouchableOpacity style={styles.iconLeft} onPress={() => {}}>
        <Text style={{color: 'white'}}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconRight} onPress={() => {}}>
        <Text style={{color: 'white'}}>Me</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const renderContent = () => {
  return (
    <View>
      <ScrollView style={{flex: 1}}>
        <VirtualizedList
          data={messages}
          getItem={(data, index) => data[index]}
          getItemCount={(data) => data.length}
          // howsVerticalScrollIndicator={false}
          keyExtractor={(type) => type.ID.toString()}
          renderItem={({item}) => (
            <Transaction
              style={styles.transaction}
              id={item.ID}
              type={item.TYPE}
              name={nameTitleCase(item.NAME)}
              date={item.DATE}
              time={item.TIME}
              cost={item.COST}
              amount={item.AMOUNT}
              // navigation={navigation}
              // transactionCost={item.transactionCost}
            />
          )}
        />
      </ScrollView>
    </View>
  );
};

const title = () => {
  return (
    <View style={styles.body}>
      <Text style={{color: 'white', fontSize: 25}}>Parallax Header</Text>
    </View>
  );
};



const FilterDetailScreen = ({navigation}) => {
  // console.log(navigation);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ReactNativeParallaxHeader
        headerMinHeight={HEADER_HEIGHT}
        headerMaxHeight={250}
        extraScrollHeight={20}
        navbarColor="#3498db"
        titleStyle={styles.titleStyle}
        title={title()}
        // backgroundImage={require('./bg.png')}
        backgroundImageScale={1.2}
        renderNavBar={renderNavBar}
        renderContent={renderContent}
        containerStyle={styles.container}
        contentContainerStyle={styles.contentContainer}
        innerContainerStyle={styles.container}
        scrollViewProps={{
          onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
          onScrollEndDrag: () => console.log('onScrollEndDrag'),
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  navContainer: {
    height: HEADER_HEIGHT,
    marginHorizontal: 10,
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: 'transparent',
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  titleStyle: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default FilterDetailScreen;
