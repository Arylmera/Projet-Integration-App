import React from 'react';
import renderer from 'react-test-renderer';
import Tips from '../components/View/tips/TipsView';
import {render, cleanup} from 'react-native-testing-library';

beforeAll(() => {
    jest.mock('@react-native-community/async-storage');
})

afterEach(cleanup);

it('renders correctly', async () => {
    const tree = renderer.create(<Tips />).toJSON();
    expect(tree).toMatchSnapshot();
});

describe('<Tips />', () => {
    it('should match snapshot', () => {
        const rendered = render(<Tips text={'abacaba'} />).toJSON();

        expect(rendered).toMatchSnapshot();
    });

    it('should properly render the text', () => {
        const rendered = render(<Tips text={'abacaba'} />);
        const textComponent = rendered.getByTestId('text');

        expect(textComponent.props.children).toEqual('abacaba');
    });

    it('should render red text', () => {
        const rendered = render(<Tips text={'abacaba'} />);
        const textComponent = rendered.getByTestId('text');

        expect(textComponent.props.style).toMatchObject({color: 'red'});
    });

    it('should wrap text with a flexible wrapper', () => {
        const rendered = render(<Tips text={'abacaba'} />);
        const wrapperComponent = rendered.getByTestId('wrapper');

        expect(wrapperComponent.props.style).toMatchObject({flex: 1});
    });
});
