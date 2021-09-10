import { useState } from 'react'
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

function TranslateForm() {
    const [resultText, setResultText] = useState('')
    const [apiError, setApiError] = useState('')

    function validateText(value) {
        let error
        if (!value) {
            error = "Text is required"
        }
        return error
    }

    async function handleSubmit(values, actions) {
        actions.setSubmitting(true)
        const options = {
            method: 'POST',
            url: `https://translation.googleapis.com/language/translate/v2?key=${process.env.REACT_APP_API_KEY}`,
            data: qs.stringify({
                q : values.originalText,
                source : `en`,
                target : `it`
            })
        }

        await axios.request(options).then(function (response) {
            const translatedText = response.data.data.translations[0].translatedText
            setResultText(translatedText)
        }).catch(function (error) {
            setApiError(error)
        })
        actions.setSubmitting(false)
    }

    return (
        <Formik
            initialValues={{ originalText: '' }}
            onSubmit={handleSubmit}
        >
            {props => (
                <Form className='form-container' onSubmit={props.handleSubmit}>
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
                        colorScheme='teal'
                        isLoading={props.isSubmitting}
                        type="submit"
                        id='submit-btn'
                        size='lg'
                    >
                        Translate
                    </Button>
                    <div className='result-container'>
                        <Text className='result-label'>Italian Translation</Text>
                        <div className='result-box'>
                            {apiError ? <Text size='md' style={{color: 'red'}}>{apiError}</Text>:
                                <Text size='md' data-testid='result-correct'>{resultText}</Text>}
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default TranslateForm