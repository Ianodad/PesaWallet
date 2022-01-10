import React from 'react';
import SourceLoader from './SourceLoader';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const containerWidth = responsiveWidth(100);
const containerHeight = responsiveHeight(100);
const width = responsiveWidth(95);
const height = responsiveHeight(95);

const index = ({Loader}) => {
  console.log(
    'containerWidth',
    containerWidth,
    'containerHeight',
    containerHeight,
    'width',
    width,
    'height',
    height,
  );
  return (
    <>
      {Loader === 'SourceDetails' && (
        <SourceLoader
          width={width}
          height={height}
          containerWidth={containerWidth}
          containerHeight={containerHeight}
        />
      )}
    </>
  );
};

export default index;
