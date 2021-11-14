import React from "react";
import {Button, Center, Image, Text, VStack} from "@chakra-ui/react";
import {useHistory} from "react-router-dom";

export const LandingPage = () => {
    const history = useHistory()

    return (
        <Center py={'100px'}>
            <VStack>
                <Image src={'/logo.png'} alt={'logo'}/>
                <Text fontSize={'x-large'}>Website under construction</Text>
                <Button onClick={() => history.push('/account/login')}>Login here</Button>
            </VStack>
        </Center>
    )
}
