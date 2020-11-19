import React from 'react';
import renderer from 'react-test-renderer';
import LoadingScreen from '../components/View/LoadingScreen';

test('renders correctly', () => {
   const tree = renderer.create(<LoadingScreen />).toJSON();
   expect(tree).toMatchSnapshot();
});
