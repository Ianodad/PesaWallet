import React from 'react';
import HomeScreen from '../src/screens/HomeScreen';

import {render, fireEvent} from '@testing-library/react-native';

test('Home snapShot', () => {
  const snap = render.create(<HomeScreen />).toJSON();
  expect(snap).toMatchSnapshot();
});
