import 'react-native';
import React from 'react';
import {render, cleanup, fireEvent} from 'react-native-testing-library';
import connexionProfilView from '../components/View/profile/connexionProfilView';
import MockedNavigator from "../__mocks__/MockedNavigator";
import firebase from 'firebase';
import {firebaseConfig} from '../config';

afterEach(cleanup);

firebase.initializeApp(firebaseConfig);

test('render without crashing', () => {
    const {toJSON} = render(
        <MockedNavigator component={connexionProfilView} />
    )
    expect(toJSON()).toBeTruthy();
})

test('should match snapshot', () => {
    const {toJSON} = render(
        <MockedNavigator component={connexionProfilView} />
    );
    expect(toJSON()).toMatchSnapshot();
});

test('textInput email exists', () => {
    const component = render(
        <MockedNavigator component={connexionProfilView} />
    ).getByPlaceholder('email')
    expect(component).toBeTruthy()
})

test('textInput password exists', () => {
    const component = render(
        <MockedNavigator component={connexionProfilView} />
    ).getByPlaceholder('mot de passe')
    expect(component).toBeTruthy()
})

test('touchableOpacity connexion exists', () => {
    const component = render(
        <MockedNavigator component={connexionProfilView} />
    ).getByText('Connexion')
    expect(component).toBeTruthy()
})

test('touchableOpacity inscription exists', () => {
    const component = render(
        <MockedNavigator component={connexionProfilView} />
    ).getByText('inscription')
    expect(component).toBeTruthy()
})

test('touchableOpacity mot de passe oublié exists', () => {
    const component = render(
        <MockedNavigator component={connexionProfilView} />
    ).getByText('mot de passe oublié ?')
    expect(component).toBeTruthy()
})
