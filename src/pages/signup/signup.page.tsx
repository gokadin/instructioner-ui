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
import {signUp} from "../account/reducer";
import {useDispatch, useSelector} from "react-redux";
import {selectIsSigningUp, selectIsSignUpSuccess, selectSignUpError} from "../account/selectors";

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

    useEffect(() => {
        if (isSigningSuccess) {
            toast({
                title: "Account created.",
                description: "Please verify your email",
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

    return (
        <Center h={'80vh'}>
            <form onSubmit={(e) => e.preventDefault()}>
                <VStack spacing={2} p={10} bg={'gray.900'} align={'stretch'} boxShadow={'md'} rounded={'md'}
                        w={'380px'}>
                    <Image src={'/logo.png'} alt={'logo'}/>
                    <Heading py={4} as={'h1'}>Sign up</Heading>
                    <FormControl>
                        <AmplifyGoogleButton
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
                        <FormLabel>Email</FormLabel>
                        <Input type={'email'} placeholder={'Email'} value={email}
                               onBlur={() => setEmailTouched(true)}
                               onChange={(e) => handleEmailChange(e.target.value)}/>
                        <FormErrorMessage>Please enter a valid email</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={passwordTouched && !passwordIsValid}>
                        <FormLabel>Password</FormLabel>
                        <Input type={'password'} placeholder={'Password'} value={password}
                               onBlur={() => setPasswordTouched(true)}
                               onChange={(e) => handlePasswordChange(e.target.value)}/>
                        <FormErrorMessage>Password must be at least 8 characters long</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={confirmPasswordTouched && !confirmPasswordIsValid}>
                        <FormLabel>Confirm password</FormLabel>
                        <Input type={'password'} placeholder={'Confirm password'} value={confirmPassword}
                               onBlur={() => setConfirmPasswordTouched(true)}
                               onChange={(e) => handleConfirmPasswordChange(e.target.value)}/>
                        <FormErrorMessage>Please enter a matching password</FormErrorMessage>
                    </FormControl>
                    <FormControl paddingTop={2}>
                        <Button type={'submit'} w={'100%'} size={'md'} colorScheme={'orange'} isLoading={isSigningUp}
                                loadingText={'Signing up'} onClick={submit}>Sign up</Button>
                    </FormControl>
                    <FormControl>
                        <HStack>
                            <Text>Already have an account? </Text>
                            <Button colorScheme={'orange'} variant={'link'}
                                    onClick={() => history.push('/account/login')}>
                                Log in</Button>
                        </HStack>
                    </FormControl>
                </VStack>
            </form>
        </Center>
    )
}
