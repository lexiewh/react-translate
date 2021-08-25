import App from '../App';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('App', () => {
  it('should include the main component', () => {
    const wrapper = shallow(<App />)

    const mainComponent = wrapper.find('Main')
    expect(mainComponent).toHaveLength(1)
  })

  it('should include UI provider', () => {
    const wrapper = shallow(<App />)

    const uiProvider = wrapper.find('ChakraProvider')
    expect(uiProvider).toHaveLength(1)
  })
})