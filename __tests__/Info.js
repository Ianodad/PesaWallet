import React from 'react';
import Info from '../src/components/Button/Info';
import renderer from 'react-test-renderer';
import {Text} from 'react-native';

import toJson from 'enzyme-to-json';

const defaultProps = {
  style: {margin: '10px'},
  subTitle: 'subTitle',
  subStyle: {margin: '10px'},
  detail: 'detail',
  detailStyle: {margin: '10px'},
};

describe('<Button/>', () => {
  const fn = jest.fn();
  const image = jest.mock('../src/assets/bootsplash_logo.png');
  const subTitle = 'subTitle';
  const detail = 'detail';
  describe('Rendering with snapshot', () => {
    // should render with any outcome
    it('should match to snapshot with crashing', () => {
      // eslint-disable-next-line no-undef
      const component = shallow(<Info />);
      expect(component).toMatchSnapshot();
    });

    it('should match subTitle snapshot with crashing', () => {
      // eslint-disable-next-line no-undef
      const component = shallow(<Info subTitle={subTitle} />);
      expect(component).toMatchSnapshot();
    });

    it('should match detail snapshot with crashing', () => {
      // eslint-disable-next-line no-undef
      const component = shallow(<Info detail={detail} />);
      expect(component).toMatchSnapshot();
    });

    it('should render with title snapshot', () => {
      const component = shallow(<Info {...defaultProps} />);
      expect(component).toMatchSnapshot();
    });

    describe('Rendering with unit testing', () => {
      it('find Element', () => {
        let component = renderer.create(<Info subTitle={'subTitle'} />);
        // get  the passed props from the component
        let instanceProps = component.root.findByType(Text).props.children;
        expect(instanceProps).toEqual('subTitle');
      });
    });
  });
});
