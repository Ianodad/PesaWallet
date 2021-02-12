import React from 'react';
import IconButton from '../src/components/Button/IconButton';

const defaultProps = {
  title: 'title',
  onPress: jest.fn(),
  style: {margin: '10px'},
  imageStyle: {margin: '10px'},
  image: jest.mock('../src/assets/bootsplash_logo.png'),
  info: 'test',
  textStyle: {margin: 'black'},
  iconStyle: {margin: '10px'},
  color: 'primary',
  buttonType: true,
};

describe('<IconButton/>', () => {
  const fn = jest.fn();
  const image = jest.mock('../src/assets/bootsplash_logo.png');
  describe('Rendering with snapshot', () => {
    // should render with any outcome
    it('should match to snapshot', () => {
      const component = shallow(<IconButton />);
      expect(component).toMatchSnapshot();
    });
    //
    it('should render with title snapshot', () => {
      const component = shallow(<IconButton title={'Submit'} />);
      expect(component).toMatchSnapshot();
    });
    it('should render with image', () => {
      const component = shallow(<IconButton title={'Submit'} image={image} />);
      expect(component).toMatchSnapshot();
    });
     it('should render with icon', () => {
      const component = shallow(<IconButton title={'Submit'} icon={true} />);
      expect(component).toMatchSnapshot();
    });

    it('should render with function passed snapshot', () => {
      const component = shallow(<IconButton title={'Submit'} onPress={fn} />);
      expect(component).toMatchSnapshot();
    });

    it('should render with info passed', () => {
      const component = shallow(
        <IconButton title={'Submit'} info={'test case'} />,
      );
      expect(component).toMatchSnapshot();
    });

    it('should render with with passed props', () => {
      const component = shallow(<IconButton {...defaultProps} />);
      expect(component).toMatchSnapshot();
    });
  });
});
