import React from 'react';
import {shallow} from 'enzyme';
import Button from '../src/components/Button/Button';

const defaultProps = {
  title: 'title',
  onPress: jest.fn(),
  style: {margin: '10px'},
  iconStyle: {margin: '10px'},
  image: jest.mock('../src/assets/bootsplash_logo.png'),
  textStyle: {color: 'black'},
  color: 'primary',
  buttonType: true,
};

describe('<Button/>', () => {
  const fn = jest.fn();
  const image = jest.mock('../src/assets/bootsplash_logo.png');
  describe('Rendering with snapshot', () => {
    // should render with any outcome
    it('should match to snapshot', () => {
      const component = shallow(<Button />);
      expect(component).toMatchSnapshot();
    });
    //
    it('should render with title snapshot', () => {
      const component = shallow(<Button title={'Submit'} />);
      expect(component).toMatchSnapshot();
    });

    it('should render with function props', () => {
      const component = shallow(<Button title={'Submit'} onPress={fn} />);
      expect(component).toMatchSnapshot();
    });

    it('should render with buttonType true', () => {
      const component = shallow(
        <Button title={'Submit'} onPress={fn} buttonType={true} />,
      );
      expect(component).toMatchSnapshot();
    });

    it('should render with buttonType begin false', () => {
      const component = shallow(
        <Button title={'Submit'} onPress={fn} buttonType={false} />,
      );
      expect(component).toMatchSnapshot();
    });

    it('should render with image', () => {
      const component = shallow(
        <Button title={'Submit'} onPress={fn} image={image} />,
      );
      expect(component).toMatchSnapshot();
    });

    it('should render with image and button true', () => {
      const component = shallow(
        <Button
          title={'Submit'}
          onPress={fn}
          buttonType={true}
          image={image}
        />,
      );
      expect(component).toMatchSnapshot();
    });

    it('should render with with passed props', () => {
      const component = shallow(<Button {...defaultProps} />);
      expect(component).toMatchSnapshot();
    });
  });
});
