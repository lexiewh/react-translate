import { Formik, Form, Field } from 'formik'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Button
} from "@chakra-ui/react"

function TranslateForm({ onSubmit }) {

    function validateText(value) {
    let error
    if (!value) {
      error = "Text is required"
    }
    return error
  }

  function handleSubmit(values, actions){
    //console.log(JSON.stringify(values, null, 2))
    actions.setSubmitting(false)
    onSubmit(values)
  }

    return (
        <Formik
            initialValues={{ originalText: '' }}
            onSubmit={handleSubmit}
        >
            {props => (
            <Form>
                <Field name='originalText' id='originalText' validate={validateText}>
                    {({ field, form }) => (
                        <FormControl isInvalid={form.errors.originalText && form.touched.originalText}>
                            <FormLabel htmlFor="originalText">Text to Translate</FormLabel>
                            <Textarea {...field} id="originalText" />
                            <FormErrorMessage data-testid='form-error'>{form.errors.originalText}</FormErrorMessage>
                        </FormControl>
                    )}
                </Field>
                <Button
                    mt={4}
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