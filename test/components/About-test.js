import React from 'react/addons';
import { expect } from 'chai';
import About from '../../src/components/About';

describe('About', () => {
  const {TestUtils} = React.addons;
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<About />);
  const about = shallowRenderer.getRenderOutput();

  it('should have a div as container', () => {
    expect(about.type).to.equal('div');
  });

  it('should have an h2 tag containing the text "About"', () => {
    expect(about.props.children).to.contain(<h2>About</h2>);
  });

});
