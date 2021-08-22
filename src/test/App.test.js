import App from '../App';
import Enzyme, { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

it('correctly renders enzyme', () => {
  const wrapper = shallow(<App />)

  expect(toJson(wrapper)).toMatchSnapshot()
})