import React, {useState, useEffect} from 'react';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import Carousel from 'react-native-snap-carousel';
import {connect} from 'react-redux';
import {phoneNumberChecker} from '../_helpers/phoneNumberChecker';
import {sources} from '../services/sources';
import {scrollInterpolators, animatedStyles} from '../utils/animations';
import ProviderCard from './ProviderCard';

const ProviderSlider = ({navigation, onSliderInfo, phoneNumber}) => {
  const isCarousel = React.useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    onSliderInfo(sources[index]);
  });

  const _renderItem = ({item, index: i}) => {
    return (
      <ProviderCard
        key={i}
        title={item.title}
        logo={item.logo}
        balance={item.balance}
        phoneNumber={item.phoneNumber}
        gradientColors={item.color}
        onPress={() => navigation.navigate('SourceDetails', item)}
      />
    );
  };

  const filterChange = data => {
    const replaceCode = no => {
      const reg = /\+?254/;
      return no.replace(reg, '0');
    };
    const newArr = data.map(source => {
      if (source.title === phoneNumberChecker(phoneNumber)) {
        return {...source, phoneNumber: replaceCode(phoneNumber), balance: 300};
      }

      return source;
    });

    console.log(newArr);
    return newArr;
  };
  // const sliderInfoIndex = index => {
  //   onSliderInfo(index);
  // };
  return (
    <Carousel
      ref={c => {
        isCarousel.current = c;
      }}
      data={filterChange(sources)}
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
