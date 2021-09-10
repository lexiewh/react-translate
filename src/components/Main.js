import { Container, Heading, Flex } from '@chakra-ui/react'
import TranslateForm from './TranslateForm'
import Footer from './Footer'

function Main(){
    return(
        <Container maxW='xl' centerContent className='main-container'>
            <Flex flexDirection='column'>
                <Heading as='h2' size='2xl'>Translate</Heading>
                <TranslateForm />
                <Footer />
            </Flex>
        </Container>
    )
}

export default Main