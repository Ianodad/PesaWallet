import React, {useState, useEffect} from 'react';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import Carousel from 'react-native-snap-carousel';
import {connect} from 'react-redux';
import {phoneNumberChecker} from '../_helpers/phoneNumberChecker';
import {sources} from '../services/sources';
import {scrollInterpolators, animatedStyles} from '../utils/animations';
import ProviderCard from './ProviderCard';

const ProviderSlider = ({
  navigation,
  onSliderInfo,
  phoneNumber = '0700XXXXXX',
  balances,
}) => {
  const isCarousel = React.useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    onSliderInfo(sources[index]);
  });
  const replaceCode = no => {
    const reg = /\+?254/;
    return no.replace(reg, '0');
  };
  const _renderItem = ({item, index: i}) => {
    return (
      <ProviderCard
        key={i}
        title={item.title}
        logo={item.logo}
        balance={item.balance}
        accountNo={replaceCode(item.accountNo)}
        gradientColors={item.color}
        onPress={() => navigation.navigate('SourceDetails', item)}
      />
    );
  };

  const filterChange = data => {
    // console.log(data);
    const newArr = data?.map(source => {
      console.log(source.title);
      if (source.title === phoneNumberChecker(phoneNumber)) {
        return {
          ...source,
          accountNo: replaceCode(phoneNumber),
          balance: balances[source.title] || 0,
        };
      }

      return source;
    });
    return newArr;
  };
  console.log('phoneNumber', phoneNumberChecker(phoneNumber));
  // const sliderInfoIndex = index => {
  //   onSliderInfo(index);
  // };
  return (
    <Carousel
      ref={c => {
        isCarousel.current = c;
      }}
      data={filterChange(sources)}
      // data={sources}
      renderItem={_renderItem}
      sliderWidth={responsiveWidth(100)}
      itemWidth={responsiveWidth(90)}
      layoutCardOffset={8}
      onSnapToItem={index => onSliderInfo(sources[index])}
      scrollInterpolator={scrollInterpolators.scrollInterpolator1}
      slideInterpolatedStyle={animatedStyles.slideInterpolatedStyle1}
      useScrollView={true}
      layout={'default'}
      activeAnimationType={'spring'}
      activeAnimationOptions={{
        friction: 4,
        tension: 40,
      }}
    />
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProviderSlider);
