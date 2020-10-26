import React from 'react';
import TipsView from '../components/View/tips/TipsView';
import {render, cleanup} from 'react-native-testing-library';

afterEach(cleanup);

describe('<TipsView />', () => {
    it('should match snapshot', () => {
        const rendered = render(<TipsView value={'abacaba'} />).toJSON();

        expect(rendered).toMatchSnapshot();
    });

    it('should properly render the text', () => {
        const rendered = render(<TipsView value={'abacaba'} />);
        const textComponent = rendered.getByTestId('text');

        expect(textComponent.props.children).toEqual('abacaba');
    });

});