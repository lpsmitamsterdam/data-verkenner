import React from 'react'
import { mount, shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { ThemeProvider } from '@datapunt/asc-ui'
import SpecialsPage from './SpecialsPage'
import useDataFetching from '../../utils/useDataFetching';
import SHARED_CONFIG from '../../../shared/services/shared-config/shared-config'

jest.mock('../../utils/useDataFetching')

describe('SpecialsPage', () => {  
  const specialsId = 6

  it('should render the spinner when the request is loading', () => {    
    useDataFetching.mockImplementation(() => ({
      loading: true
    }))

    const store = configureMockStore()({ location: { payload: { id: specialsId } } })
    const component = shallow(<SpecialsPage />, { context: { store } }).dive()

    const spinner = component.find('Spinner').at(0)
    expect(spinner.exists()).toBeTruthy()
  })


  it('should render the iframe when there are results', () => {
    useDataFetching.mockImplementation(() => ({
      results: {
        data: [
          {
            attributes: {
              title: "This is a title",
              field_iframe_link: {
                uri: "http://this.is.alink"
              }
            }
          }
        ]
      }
    }))
    
    const store = configureMockStore()({ location: { payload: { id: specialsId } } })
    const component = shallow(<SpecialsPage />, { context: { store } }).dive()

    const iframe = component.find('iframe').at(0)
    expect(iframe.exists()).toBeTruthy()
  })

  it('should call the fetchData function when the component mounts', () => {    
    const fetchDataMock = jest.fn()
    useDataFetching.mockImplementation(() => ({
      fetchData: fetchDataMock,
      loading: true
    }))

    const store = configureMockStore()({ location: { payload: { id: specialsId } } })
    const component = mount(<ThemeProvider><SpecialsPage store={store} /></ThemeProvider>)

    const endpoint = `${SHARED_CONFIG.CMS_ROOT}special?filter[drupal_internal__nid]=${specialsId}`

    expect(component.find('SpecialsPage').props().endpoint).toBe(endpoint)

    expect(fetchDataMock).toHaveBeenCalledWith(endpoint)
  })
})
