import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

function setup(props) {
  return shallow(<App {...props} />);
}

describe('<App /> component', () => {
  it('renders itself', () => {
    // Arrange Act
    const wrapper = setup({});

    // Assert
    expect(wrapper.find('BrowserRouter')).toHaveLength(1);
    expect(wrapper.find('Switch')).toHaveLength(1);
    expect(wrapper.find('Route')).toHaveLength(3);
  });
});
