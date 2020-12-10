import 'react-native';
import React from 'react';
import {render, cleanup} from 'react-native-testing-library';
import ResetPasswordProfilView from '../components/View/profile/ResetPasswordProfilView';
import MockedNavigator from '../__mocks__/MockedNavigator';
import firebase from 'firebase';
import {firebaseConfig} from '../config';

afterEach(cleanup);

firebase.initializeApp(firebaseConfig);

test('render without crashing', () => {
   const {toJSON} = render(
      <MockedNavigator component={ResetPasswordProfilView} />,
   );
   expect(toJSON()).toBeTruthy();
});

test('should match snapshot', () => {
   const {toJSON} = render(
      <MockedNavigator component={ResetPasswordProfilView} />,
   );
   expect(toJSON()).toMatchSnapshot();
});
