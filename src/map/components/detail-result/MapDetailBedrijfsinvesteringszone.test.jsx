import React from 'react';
import { shallow } from 'enzyme';

import MapDetailBedrijfsinvesteringszone from './MapDetailBedrijfsinvesteringszone';

describe('MapDetailBedrijfsinvesteringszone', () => {
  it('should render everything', () => {
    const bedrijfsinvesteringszone = {
      heffing: 'Bedrijfsinvesteringszone heffing',
      heffingsgrondslag: 'Bedrijfsinvesteringszone heffingsgrondslag',
      heffingsplichtigen: 80,
      label: 'Bedrijfsinvesteringszone label',
      name: 'Bedrijfsinvesteringszone name',
      type: 'Bedrijfsinvesteringszone type'
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailBedrijfsinvesteringszone
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        bedrijfsinvesteringszone={bedrijfsinvesteringszone}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
