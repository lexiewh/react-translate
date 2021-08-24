import { Container, Heading } from '@chakra-ui/react'
import TranslateForm from './TranslateForm'

function Main(){
    return(
        <Container centerContent className='main-container'>
            <Heading as='h2' size='2xl'>Translate</Heading>
            <TranslateForm />
        </Container>
    )
}

export default Main