import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import qs from 'qs'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Button,
  Text
} from "@chakra-ui/react"

function TranslateForm({ onSubmit }) {

    function validateText(value) {
        let error
        if (!value) {
        error = "Text is required"
        }
        return error
    }

    function handleSubmit(values, actions) {
        const options = {
            method: 'POST',
            url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'x-rapidapi-host': process.env.REACT_APP_RAPID_HOST,
                'x-rapidapi-key': process.env.REACT_APP_RAPID_KEY
            },
            data: qs.stringify({
                q : values.originalText,
                source : `en`,
                target : `it`
            })
        }

        axios.request(options).then(function (response) {
            console.log(response.data.data.translations[0].translatedText);
        }).catch(function (error) {
            console.error(error);
        })
        actions.setSubmitting(false)
        onSubmit(values)
    }

    return (
        <Formik
            initialValues={{ originalText: '' }}
            onSubmit={handleSubmit}
        >
            {props => (
            <Form className='form-container'>
                <Field name='originalText' id='originalText' validate={validateText}>
                    {({ field, form }) => (
                        <FormControl isInvalid={form.errors.originalText && form.touched.originalText}>
                            <FormLabel htmlFor="originalText">English Text to Translate</FormLabel>
                            <Textarea {...field} id="originalText" />
                            <FormErrorMessage data-testid='form-error'>{form.errors.originalText}</FormErrorMessage>
                        </FormControl>
                    )}
                </Field>
                <Button
                    mt={4}
                    colorScheme='cyan'
                    isLoading={props.isSubmitting}
                    loadingText="Submitting"
                    type="submit"
                    id='submit-btn'
                    size='lg'
                >
                    Translate
                </Button>
                <div className='result-container'>
                    <Text className='result-label'>Italian Translation</Text>
                    <div className='result-box'></div>
                </div>
            </Form>)}
        </Formik>
    )
}

export default TranslateForm