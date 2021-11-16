import React, {useEffect, useState} from "react";
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
    useToast,
    VStack
} from "@chakra-ui/react";
import {AmplifyGoogleButton} from "@aws-amplify/ui-react";
import {useHistory} from "react-router-dom";
import validator from "validator";
import {getCurrentUser, signUp} from "../account/reducer";
import {useDispatch, useSelector} from "react-redux";
import {selectIsSigningUp, selectIsSignUpSuccess, selectSignUpError} from "../account/selectors";
import { useTranslation } from 'react-i18next';

export const SignupPage = () => {
    const history = useHistory()
    const isSigningUp = useSelector(selectIsSigningUp)
    const isSigningSuccess = useSelector(selectIsSignUpSuccess)
    const signUpError = useSelector(selectSignUpError)
    const dispatch = useDispatch()
    const toast = useToast()
    const [email, setEmail] = useState('')
    const [emailTouched, setEmailTouched] = useState(false)
    const [emailIsValid, setEmailIsValid] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordTouched, setPasswordTouched] = useState(false)
    const [passwordIsValid, setPasswordIsValid] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false)
    const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(false)
    const {t} = useTranslation();

    useEffect(() => {
        if (isSigningSuccess) {
            toast({
                title: t("account_created_success"),
                description: t("account_created_success_description"),
                status: "success",
                duration: 9000,
                isClosable: true,
            })
        }
    }, [isSigningSuccess])

    const submit = async () => {
        if (!emailIsValid || !passwordIsValid) {
            setEmailTouched(true)
            setPasswordTouched(true)
            setConfirmPasswordTouched(true)
            return
        }

        dispatch(signUp({username: email, password}))
    }

    const handleEmailChange = (value: string) => {
        setEmail(value)
        setEmailIsValid(value !== '' && validator.isEmail(value))
    }

    const handlePasswordChange = (value: string) => {
        setPassword(value)
        setPasswordIsValid(value.length >= 8)
    }

    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value)
        setConfirmPasswordIsValid(value !== '' && value === password)
    }

    const handleGoogle = async (authState: string) => {
        console.log('google handler', authState)
        if (authState.toUpperCase() === 'SIGNEDIN') {
            dispatch(getCurrentUser())
        }
    }

    return (
        <Center h={'80vh'}>
            <form onSubmit={(e) => e.preventDefault()}>
                <VStack spacing={2} p={10} bg={'gray.900'} align={'stretch'} boxShadow={'md'} rounded={'md'}
                        w={'380px'}>
                    <Image src={'/logo.png'} alt={'logo'}/>
                    <Heading py={4} as={'h1'}>{t("sign_up_header")}</Heading>
                    <FormControl>
                        <AmplifyGoogleButton handleAuthStateChange={handleGoogle}
                                             clientId={'246749858319-dahqobrn4n4be92bcr0jmvj9b514fr90.apps.googleusercontent.com'}/>
                        {/*<Button w={'100%'} colorScheme={'blue'}*/}
                        {/*        onClick={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google})}>Continue*/}
                        {/*    with Google</Button>*/}
                    </FormControl>
                    <HStack>
                        <Divider/>
                        <Text color={'gray.300'}>or</Text>
                        <Divider/>
                    </HStack>
                    {!isSigningUp && signUpError !== '' &&
                    <Alert status="error">
                        <AlertIcon/>
                        {signUpError}
                    </Alert>
                    }
                    <FormControl isInvalid={emailTouched && !emailIsValid}>
                        <FormLabel>{t("email_label")}</FormLabel>
                        <Input type={'email'} placeholder={t("email_label")} value={email}
                               onBlur={() => setEmailTouched(true)}
                               onChange={(e) => handleEmailChange(e.target.value)}/>
                        <FormErrorMessage>{t("email_validation")}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={passwordTouched && !passwordIsValid}>
                        <FormLabel>{t("password_label")}</FormLabel>
                        <Input type={'password'} placeholder={t("password_label")} value={password}
                               onBlur={() => setPasswordTouched(true)}
                               onChange={(e) => handlePasswordChange(e.target.value)}/>
                        <FormErrorMessage>{t("password_validation")}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={confirmPasswordTouched && !confirmPasswordIsValid}>
                        <FormLabel>{t("password_confirm_label")}</FormLabel>
                        <Input type={'password'} placeholder={t("password_confirm_label")} value={confirmPassword}
                               onBlur={() => setConfirmPasswordTouched(true)}
                               onChange={(e) => handleConfirmPasswordChange(e.target.value)}/>
                        <FormErrorMessage>{t("password_confirm_validation")}</FormErrorMessage>
                    </FormControl>
                    <FormControl paddingTop={2}>
                        <Button type={'submit'} w={'100%'} size={'md'} colorScheme={'orange'} isLoading={isSigningUp}
                                loadingText={'Signing up'} onClick={submit}>{t("sign_up_btn")}</Button>
                    </FormControl>
                    <FormControl>
                        <HStack>
                            <Text>{t("have_account_question")}</Text>
                            <Button colorScheme={'orange'} variant={'link'}
                                    onClick={() => history.push('/account/login')}>
                                {t("login")}</Button>
                        </HStack>
                    </FormControl>
                </VStack>
            </form>
        </Center>
    )
}
