import React from 'react';
import renderer from 'react-test-renderer';
import Inscription from '../components/View/profile/InscriptionProfilView'
import {render, cleanup} from 'react-native-testing-library';

it('nom bon', () => {
    let component = renderer.create(<Inscription/>).getInstance();
    let tree = component._nomTextInputChanged('antoine');
    expect(tree).toEqual('antoine')
    
  });

  it('prénom bon', () => {
    let component = renderer.create(<Inscription/>).getInstance();
    let tree = component._prenomTextInputChanged('Gregoire');
    expect(tree).toEqual('Gregoire')
    
  });
   
  it('email bon', () => {
    let component = renderer.create(<Inscription/>).getInstance();
    let tree = component._emailTextInputChanged('Gregoire@gmail');
    expect(tree).toEqual('Gregoire@gmail')
    
  });