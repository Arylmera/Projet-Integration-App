import 'react-native';
import React from 'react';
import {render, cleanup} from 'react-native-testing-library';
import InscriptionProfilView from "../components/View/profile/InscriptionProfilView";
import MockedNavigator from "../__mocks__/MockedNavigator";
import firebase from "firebase";
import {firebaseConfig} from "../config";

afterEach(cleanup);

firebase.initializeApp(firebaseConfig);

test('render without crashing', () => {
    const {toJSON} = render(
        <MockedNavigator component={InscriptionProfilView} />
    )
    expect(toJSON()).toBeTruthy();
})

test('should match snapshot', () => {
    const {toJSON} = render(
        <MockedNavigator component={InscriptionProfilView} />
    );
    expect(toJSON()).toMatchSnapshot();
});

test('textInput nom exists', () => {
    const component = render(
        <MockedNavigator component={InscriptionProfilView} />
    ).getByPlaceholder('nom')
    expect(component).toBeTruthy()
})

test('textInput prenom exists', () => {
    const component = render(
        <MockedNavigator component={InscriptionProfilView} />
    ).getByPlaceholder('prénom')
    expect(component).toBeTruthy()
})

test('textInput email exists', () => {
    const component = render(
        <MockedNavigator component={InscriptionProfilView} />
    ).getByPlaceholder('email')
    expect(component).toBeTruthy()
})

test('textInput password exists', () => {
    const component = render(
        <MockedNavigator component={InscriptionProfilView} />
    ).getAllByPlaceholder('mot de passe')
    expect(component).toBeTruthy()
})

test('touchableOpacity inscription exists', () => {
    const component = render(
        <MockedNavigator component={InscriptionProfilView} />
    ).getByText('inscription')
    expect(component).toBeTruthy()
})
