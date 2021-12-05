import React, {useState} from "react";
import {AmplifyGoogleButton} from "@aws-amplify/ui-react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUser, signIn} from "../account/reducer";
import {selectUserLoginState} from "../account/selectors";
import {
    Alert,
    AlertIcon,
    Button,
    Center,
    Divider,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Image,
    Input,
    Text,
    useColorModeValue,
    VStack
} from "@chakra-ui/react";
import validator from "validator";
import {useTranslation} from 'react-i18next';

export const LoginPage = () => {
    const history = useHistory()
    const userLoginState = useSelector(selectUserLoginState)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [emailTouched, setEmailTouched] = useState(false)
    const [emailIsValid, setEmailIsValid] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordTouched, setPasswordTouched] = useState(false)
    const [passwordIsValid, setPasswordIsValid] = useState(false)
    const cardColor = useColorModeValue('white', 'gray.900')
    const orColor = useColorModeValue('gray.700', 'gray.300')
    const {t} = useTranslation();

    const submit = async () => {
        if (!emailIsValid || !passwordIsValid) {
            setEmailTouched(true)
            setPasswordTouched(true)
            return
        }

        dispatch(signIn({username: email, password}))
    }

    const handleEmailChange = (value: string) => {
        setEmail(value)
        setEmailIsValid(value !== '' && validator.isEmail(value))
    }

    const handlePasswordChange = (value: string) => {
        setPassword(value)
        setPasswordIsValid(value !== '')
    }

    const handleGoogle = async (authState: string) => {
        if (authState.toUpperCase() === 'SIGNEDIN') {
            dispatch(getCurrentUser())
        }
    }

    return (
        <Center h={'90vh'}>
            <form onSubmit={(e) => e.preventDefault()}>
                <VStack spacing={2} p={10} bg={cardColor} align={'stretch'} boxShadow={'dark-lg'} rounded={'md'}
                        w={'380px'}>
                    <Image src={'/logo.png'} alt={'logo'}/>
                    <Heading py={4} as={'h1'}>{t("login_header")}</Heading>
                    <FormControl>
                        <AmplifyGoogleButton handleAuthStateChange={handleGoogle}
                                             clientId={'246749858319-dahqobrn4n4be92bcr0jmvj9b514fr90.apps.googleusercontent.com'}/>
                    </FormControl>
                    <HStack>
                        <Divider/>
                        <Text color={orColor}>{t("or")}</Text>
                        <Divider/>
                    </HStack>
                    {userLoginState.hasFailed() &&
                    <Alert status="error">
                        <AlertIcon/>
                        {userLoginState.getFailureMessage()}
                    </Alert>
                    }
                    <FormControl isInvalid={emailTouched && !emailIsValid}>
                        <FormLabel>{t("email_label")}</FormLabel>
                        <Input type={'email'} placeholder={t("email_label")} value={email}
                               onBlur={() => setEmailTouched(true)}
                               onChange={(e) => handleEmailChange(e.target.value)}/>
                        <FormErrorMessage>{t("email_required")}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={passwordTouched && !passwordIsValid}>
                        <FormLabel>{t("password_label")}</FormLabel>
                        <Input type={'password'} placeholder={t("password_label")} value={password}
                               onBlur={() => setPasswordTouched(true)}
                               onChange={(e) => handlePasswordChange(e.target.value)}/>
                        <FormErrorMessage>{t("password_required")}</FormErrorMessage>
                    </FormControl>
                    <FormControl paddingTop={2}>
                        <Button type={'submit'} w={'100%'} size={'md'} colorScheme={'orange'} onClick={submit}
                                isLoading={userLoginState.isLoading()}
                                loadingText={'Logging in'}>{t("login_btn")}</Button>
                    </FormControl>
                    <FormControl>
                        <HStack>
                            <Text>{t("sign_up_tooltip")}</Text>
                            <Button colorScheme={'orange'} variant={'link'}
                                    onClick={() => history.push('/account/signup')}>
                                {t("sign_up_btn")}</Button>
                        </HStack>
                    </FormControl>
                </VStack>
            </form>
        </Center>
    )
}
