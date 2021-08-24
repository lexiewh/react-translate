import { Formik, Form, Field } from 'formik'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Button
} from "@chakra-ui/react"

function TranslateForm() {

    function validateText(value) {
    let error
    if (!value) {
      error = "Text is required"
    }
    return error
  }

    return (
        <Formik
            initialValues={{ originalText: '' }}
            onSubmit={(values, actions) => {
                console.log(JSON.stringify(values, null, 2))
                actions.setSubmitting(false)
            }}
        >
            {props => (
            <Form>
                <Field name='originalText' id='originalText' validate={validateText}>
                    {({ field, form }) => (
                        <FormControl isInvalid={form.errors.originalText && form.touched.originalText}>
                            <FormLabel htmlFor="originalText">Text to Translate</FormLabel>
                            <Textarea {...field} id="originalText" />
                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                        </FormControl>
                    )}
                </Field>
                <Button
                    mt={4}
                    colorScheme="cyan"
                    isLoading={props.isSubmitting}
                    loadingText="Submitting"
                    type="submit"
                >
                    Submit
                </Button>
            </Form>)}
        </Formik>
    )
}

export default TranslateForm