import TranslateForm from '../components/TranslateForm'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { render, waitFor, fireEvent, screen, cleanup } from '@testing-library/react'

Enzyme.configure({ adapter: new Adapter() })

afterEach(cleanup)

describe('TranslateForm unit tests', () => {
    it('should include Formik', () => {
        const wrapper = shallow(<TranslateForm />)

        const formik = wrapper.find('Formik')
        expect(formik).toHaveLength(1)
    })

    it('should submit form', async () => {
        const mock = jest.fn()
        const { getByLabelText, getByText } = render(<TranslateForm onSubmit={mock} />)

        const btn = getByText('Translate')
        const text = getByLabelText('English Text to Translate')

        fireEvent.change(text, {
            target: {
                value: 'Hello World'
            }
        })
        fireEvent.click(btn)

        await waitFor(() => {
            expect(mock).toBeCalled()
            expect(mock.mock.calls[0][0].originalText).toBe('Hello World')
        })
    })

    it('should produce an error if the textarea is blank', async() => {
        const mock = jest.fn()
        const { getByLabelText, getByText } = render(<TranslateForm onSubmit={mock} />)

        const btn = getByText('Translate')
        const text = getByLabelText('English Text to Translate')

        fireEvent.change(text, {
            target: {
                value: ''
            }
        })
        fireEvent.click(btn)

        await waitFor(() => {
            expect(mock).toHaveBeenCalledTimes(0)
            expect(screen.getByText(`Text is required`)).toBeInTheDocument()
        })
    })
})