import Main from '../components/Main';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Main', () => {
  it('should contain a Chakra container and heading', () => {
    const wrapper = shallow(<Main />)

    const container = wrapper.find('Container')
    const header = wrapper.find('Heading')
    expect(header).toHaveLength(1)
    expect(container).toHaveLength(1)
  })

  it('should render TranslateForm component', () => {
    const wrapper = shallow(<Main />)

    const form = wrapper.find('TranslateForm')
    expect(form).toHaveLength(1)
  })
})