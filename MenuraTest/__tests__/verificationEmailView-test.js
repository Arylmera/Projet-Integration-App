import 'react-native';
import React from 'react';
import {render, cleanup} from 'react-native-testing-library';
import verificationEmailView from '../components/View/profile/verificationEmailView';
import MockedNavigator from '../__mocks__/MockedNavigator';
import firebase from 'firebase';
import {firebaseConfig} from '../config';

afterEach(cleanup);

firebase.initializeApp(firebaseConfig);

test('render without crashing', () => {
   const {toJSON} = render(
      <MockedNavigator component={verificationEmailView} />,
   );
   expect(toJSON()).toBeTruthy();
});

test('should match snapshot', () => {
   const {toJSON} = render(
      <MockedNavigator component={verificationEmailView} />,
   );
   expect(toJSON()).toMatchSnapshot();
});
