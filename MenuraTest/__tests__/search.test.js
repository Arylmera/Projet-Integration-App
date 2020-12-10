import React from 'react';
import renderer from 'react-test-renderer';
import Search from '../components/View/search/SearchView';

beforeAll(() => {
    jest.mock('@react-native-community/async-storage');
})


it('renders correctly', async () => {
    const tree = renderer.create(<Search />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Function _searchTextInputChanged change text equal', () => {
    let component = renderer.create(<Search />).getInstance();
    let tree = component._searchTextInputChanged('Mésange');
    expect(tree).toEqual('Mésange');
});

it('Function _searchTextInputChanged change text equal', () => {
    let component = renderer.create(<Search />).getInstance();
    let tree = component._searchTextInputChanged('Moineau');
    expect(tree).not.toEqual('Mésange');
});
