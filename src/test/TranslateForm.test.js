import TranslateForm from '../components/TranslateForm'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { render, waitFor, fireEvent, cleanup } from '@testing-library/react'

Enzyme.configure({ adapter: new Adapter() })

afterEach(cleanup)

describe('TranslateForm unit tests', () => {
    it('should include Formik', () => {
        const wrapper = shallow(<TranslateForm />)

        const formik = wrapper.find('Formik')
        expect(formik).toHaveLength(1)
    })

    it('should submit form', async () => {
        const { getByLabelText, getByText, getByTestId } = render(<TranslateForm />)

        const btn = getByText('Translate')
        const text = getByLabelText('English Text to Translate')

        fireEvent.change(text, {
            target: {
                value: 'Hello World'
            }
        })
        fireEvent.click(btn)

        await waitFor(() => {
            const res = getByTestId('result-correct')
            expect(res).toMatchObject(/Ciao mondo/)
        })
    })

    it('should produce an error if the textarea is blank', async() => {
        const { getByLabelText, getByText } = render(<TranslateForm />)

        const btn = getByText('Translate')
        const text = getByLabelText('English Text to Translate')

        fireEvent.change(text, {
            target: {
                value: ''
            }
        })
        fireEvent.click(btn)

        await waitFor(() => {
            expect(getByText(`Text is required`)).toBeInTheDocument()
        })
    })
})