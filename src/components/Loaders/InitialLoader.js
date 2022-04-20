import React from 'react';
import ContentLoader, {Rect, Circle, Path} from 'react-content-loader/native';

const InitialLoader = ({
  height,
  width,
  containerHeight,
  containerWidth,
  ...otherProps
}) => (
  <ContentLoader
    speed={2}
    width={containerWidth}
    height={containerHeight}
    viewBox={`0 0 ${containerWidth} ${containerHeight} `}
    backgroundColor="#f3f3f3"
    foregroundColor="#A1A1A1"
    {...otherProps}>
    <Rect x="30" y="25" width="143" height="20" rx="10" />
    <Rect x="30" y="63" width="215" height="20" rx="10" />
    <Rect x="30" y="405" width={width - 50} height="220" rx="20" />
    <Rect x="30" y="202" width={width - 50} height="40" />
    <Rect x="30" y="249" width={width - 50} height="40" />
    <Rect x="30" y="296" width={width - 50} height="40" />
    <Rect x="30" y="343" width={width - 50} height="40" />
    <Rect x="30" y="155" width={width - 50} height="40" />
    <Rect x="120" y="107" width="183" height="30" />
  </ContentLoader>
);

export default InitialLoader;
