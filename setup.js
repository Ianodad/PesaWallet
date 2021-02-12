import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

import React from 'react';
import toJson from 'enzyme-to-json';
import {configure, shallow, mount, render} from 'enzyme';
import renderer from 'react-test-renderer';

// import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
// point to mock fir async-storage
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

Enzyme.configure({adapter: new Adapter()});

global.React = React;
global.shallow = shallow;
global.render = render;
global.toJson = toJson;
global.renderer = renderer;
