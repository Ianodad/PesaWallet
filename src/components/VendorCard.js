import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import AnimatedLinearGradient, {
  presetColors,
} from 'react-native-animated-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default function VendorCard() {
  return (
    <>
      <View style={styles.container}>
        <AnimatedLinearGradient
          customColors={presetColors.instagram}
          speed={4000}
        />
        <View style={styles.leftCard}>
          <View style={styles.leftCardTop}>
            <Text>Safaricom</Text>
          </View>
          <View style={styles.leftCardBottom}>
            <Text>Balance</Text>
          </View>
        </View>
        <View style={styles.rightCard}>
          <View style={styles.rightCardTop}>
            <Text>Settings</Text>
          </View>
          <View style={styles.rightCardBottom}>
            <Text>More</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 0.2,
    flexDirection: 'row',
    overflow: 'hidden',
    height: 210,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'green',
  },
  leftCard: {
    // backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    // overflow: 'hidden',
  },
  leftCardTop: {
    flex: 1,
  },
  leftCardBottom: {
    flex: 1,
    backgroundColor: 'blue',
  },
  rightCard: {
    // backgroundColor: colors.primary,
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 20,
    flex: 1,
    // overflow: 'hidden',r
  },
  rightCardTop: {
    flex: 1,
  },
  rightCardBottom: {
    flex: 1,
  },
});
