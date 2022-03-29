import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../config/colors';
import defaultStyles from '../config/styles';
import Text from './Text';

// import styles from '../config/styles';

class DateLineSeparator extends Component {
  constructor(props) {
    super(props);
    // console.log(props.date);
    this.state = {
      currentDate: '',
    };
  }

  // console.log(this.props)
  render() {
    const setDate = da => {
      if (!(this.state.currentDate === da)) {
        this.setState({currentDate: da});
        return () => {
          <Text>Hello</Text>;
        };
      } else {
        return () => {
          <Text>World</Text>;
        };
      }
    };
    return <View>{setDate(this.props.date)}</View>;
  }
}

export default DateLineSeparator;

const styles = StyleSheet.create({
  outside: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingVertical: 2,
    alignItems: 'center',
  },
  separator: {
    width: '30%',
    height: 2,
    backgroundColor: defaultStyles.colors.medium,
  },
});
