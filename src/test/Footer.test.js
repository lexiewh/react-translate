import Footer from '../components/Footer';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Footer', () => {
  it('should contain a Chakra Center and Text', () => {
    const wrapper = shallow(<Footer />)

    const center = wrapper.find('Center')
    const text = wrapper.find('Text')
    expect(text).toHaveLength(1)
    expect(center).toHaveLength(1)
  })
})