import React from 'react';
import renderer from 'react-test-renderer';
import Inscription from '../components/View/profile/InscriptionProfilView'
import {render, cleanup} from 'react-native-testing-library';

  it('password bon', () => {
    let component = renderer.create(<Inscription/>).getInstance();
    let tree = component._passwordTextInputChanged('Gregoire@gmail');
    expect(tree).toEqual('Gregoire@gmail')
    
  });