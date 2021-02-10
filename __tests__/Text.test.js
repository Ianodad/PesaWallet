import React from 'react';
import {shallow} from 'enzyme';
import Text from '../src/components/Text';

describe('<Text/>', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = shallow(<Text />);
      expect(component).toMatchSnapshot();
    });

    it('should render with title snapshot', () => {
      const component = shallow(<Text title={'Submit'} />);
      expect(component).toMatchSnapshot();
    });

    it('should render with children', () => {
      const component = shallow(<Text>Header</Text>);
      expect(component).toMatchSnapshot();
    });

    it('should render with style', () => {
      const component = shallow(
        <Text style={{margin: '10px'}} title={'Submit'} />,
      );
      expect(component).toMatchSnapshot();
    });
  });
});
