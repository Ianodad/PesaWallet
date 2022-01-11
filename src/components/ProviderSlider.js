import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Carousel from 'react-native-snap-carousel';
import {connect} from 'react-redux';
import {sources} from '../services/sources';
import {scrollInterpolators, animatedStyles} from '../utils/animations';
import ProviderCard, {SLIDER_WIDTH, ITEM_WIDTH} from './ProviderCard';

const ProviderSlider = ({navigation, onSliderInfo}) => {
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
        gradientColors={item.color}
        onPress={() => navigation.navigate('SourceDetails', item)}
      />
    );
  };

  // const sliderInfoIndex = index => {
  //   onSliderInfo(index);
  // };
  return (
    <Carousel
      ref={c => {
        isCarousel.current = c;
      }}
      data={sources}
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
