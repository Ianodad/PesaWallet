import React from 'react';
import AppText from '../src/components/Text';
import renderer from 'react-test-renderer';
import {Text} from 'react-native';
import {cleanup, render} from '@testing-library/react-native';
import {toHaveStyle} from '@testing-library/jest-native';
import defaultStyles from '../src/config/styles';

afterEach(cleanup);

const defaultProps = {
  children: 'text here',
  style: {margin: '10px'},
};

describe('<Info/>', () => {
  const fn = jest.fn();
  const image = jest.mock('../src/assets/bootsplash_logo.png');
  const subTitle = 'subTitle';
  const detail = 'detail';
  describe('Rendering with snapshot', () => {
    // should render with any outcome
    it('should match to snapshot with crashing', () => {
      // eslint-disable-next-line no-undef
      const component = shallow(<Text />);
      expect(component).toMatchSnapshot();
    });

    it('should match text snapshot with crashing', () => {
      // eslint-disable-next-line no-undef
      const component = shallow(<AppText />);
      expect(component).toMatchSnapshot();
    });

    it('should match children snapshot with crashing', () => {
      // eslint-disable-next-line no-undef
      const component = shallow(<AppText>Text goes here</AppText>);
      expect(component).toMatchSnapshot();
    });

    describe('Rendering with unit testing', () => {
      expect.extend({toHaveStyle});
      it('find Element', () => {
        let component = renderer.create(<AppText>Text goes here</AppText>);
        // get  the passed props from the component
        let instanceProps = component.root.findByType(Text).props.children;
        console.log(instanceProps);
        expect(instanceProps).toEqual('Text goes here');
      });

      it('find style', () => {
        let {getByText} = render(<AppText>Text goes here</AppText>);
        let foundSectionTitle = getByText('Text goes here');
        // get  the passed props from the component
        // let instanceProps = component.root.findByType(Text).props.children;
        console.log(foundSectionTitle);
        expect(foundSectionTitle).toHaveStyle(defaultStyles.text);
        // expect('Text goes here').toEqual('Text goes here');
      });
    });
  });
});
