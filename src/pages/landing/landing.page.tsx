import React from "react";
import {Button, Center, Image, Text, VStack} from "@chakra-ui/react";
import {useHistory} from "react-router-dom";
import { useTranslation } from 'react-i18next';

export const LandingPage = () => {
    const history = useHistory()
    const {t} = useTranslation();
    return (
        <Center py={'100px'}>
            <VStack>
                <Image src={'/logo.png'} alt={'logo'}/>
                <Text fontSize={'x-large'}>{t("web_under_construction")}</Text>
                <Button onClick={() => history.push('/account/login')}>{t("login_here")}</Button>
            </VStack>
        </Center>
    )
}
