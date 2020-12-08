import 'react-native';
import React from 'react';
import {render, cleanup} from 'react-native-testing-library';
import AvatarItem from "../components/View/profile/AvatarItem";
import MockedNavigator from "../__mocks__/MockedNavigator";
import firebase from "firebase";
import {firebaseConfig} from "../config";
import avatar from '../components/View/profile/data/AvatarData'


afterEach(cleanup);

firebase.initializeApp(firebaseConfig);

test('should match snapshot', () => {
    const {toJSON} = render(
        <MockedNavigator component={AvatarItem} params={{avatar: avatar[0], root: 'AvatarView'}} />
    );
    expect(toJSON()).toMatchSnapshot();
});
