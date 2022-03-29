import React from 'react';
import ContentLoader, {Rect, Circle, Path} from 'react-content-loader/native';

const SourceLoader = ({
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
    <Rect x="10" y="18" rx="2" ry="2" width={width} height="270" />
    <Rect x="10" y="300" rx="5" ry="5" width="100" height="50" />
    <Rect x="120" y="300" rx="5" ry="5" width="100" height="50" />
    <Rect x="230" y="300" rx="5" ry="5" width="100" height="50" />
    <Rect x="340" y="300" rx="5" ry="5" width="100" height="50" />
    <Rect x="10" y="365" rx="5" ry="5" width={width} height="60" />
    <Rect x="10" y="445" rx="5" ry="5" width={width} height="60" />
    <Rect x="10" y="525" rx="5" ry="5" width={width} height="60" />
    <Rect x="10" y="605" rx="5" ry="5" width={width} height="60" />
    <Rect x="10" y="685" rx="5" ry="5" width={width} height="60" />
  </ContentLoader>
);

export default SourceLoader;
