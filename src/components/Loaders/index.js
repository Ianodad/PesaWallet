import React from 'react';
import SourceLoader from './SourceLoader';
import InitialLoader from './InitialLoader';
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
    'Loader',
    Loader,
  );
  const LOADER = {
    sourceDetails: (
      <SourceLoader
        width={width}
        height={height}
        containerWidth={containerWidth}
        containerHeight={containerHeight}
      />
    ),
    initialView: (
      <InitialLoader
        width={width}
        height={height}
        containerWidth={containerWidth}
        containerHeight={containerHeight}
      />
    ),
  };
  // const loaderData =(view) =>{
  //   loader[view]
  // }
  return <>{LOADER[Loader]}</>;
};

export default index;
