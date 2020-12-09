import 'react-native';
import React from 'react';
import {render, cleanup} from 'react-native-testing-library';
import LoadingScreen from '../components/View/LoadingScreen';
import MockedNavigator from '../__mocks__/MockedNavigator';
import firebase from 'firebase';
import {firebaseConfig} from '../config';

afterEach(cleanup);

firebase.initializeApp(firebaseConfig);

test('should match snapshot', () => {
   const {toJSON} = render(<MockedNavigator component={LoadingScreen} />);
   expect(toJSON()).toMatchSnapshot();
});
