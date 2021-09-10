import { Center, Text, Link } from '@chakra-ui/react'

function Footer() {
    return (
        <Center id='footer'>
            <Text>
                © 2021 - Developed by{" "}
                <Link isExternal color='teal' href='https://github.com/lexiewh'>
                    Lexie White
                </Link>
            </Text> 
        </Center>
    )
}

export default Footer