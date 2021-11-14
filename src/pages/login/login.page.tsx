import React, {useEffect, useState} from "react";
import {AmplifyGoogleButton} from "@aws-amplify/ui-react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signIn} from "../account/reducer";
import {selectIsLoggedIn, selectIsLoggingIn, selectLoginError} from "../account/selectors";
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
    VStack
} from "@chakra-ui/react";
import validator from "validator";

export const LoginPage = () => {
    const history = useHistory()
    const isLoggingIn = useSelector(selectIsLoggingIn)
    const loginError = useSelector(selectLoginError)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [emailTouched, setEmailTouched] = useState(false)
    const [emailIsValid, setEmailIsValid] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordTouched, setPasswordTouched] = useState(false)
    const [passwordIsValid, setPasswordIsValid] = useState(false)

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

    useEffect(() => {
        if (isLoggedIn) {
            history.push('/topics')
        }
    }, [isLoggedIn])

    return (
        <Center h={'80vh'}>
            <form onSubmit={(e) => e.preventDefault()}>
                <VStack spacing={2} p={10} bg={'gray.900'} align={'stretch'} boxShadow={'md'} rounded={'md'}
                        w={'380px'}>
                    <Image src={'/logo.png'} alt={'logo'}/>
                    <Heading py={4} as={'h1'}>Login</Heading>
                    <FormControl>
                        <AmplifyGoogleButton
                            clientId={'246749858319-dahqobrn4n4be92bcr0jmvj9b514fr90.apps.googleusercontent.com'}/>
                    </FormControl>
                    <HStack>
                        <Divider/>
                        <Text color={'gray.300'}>or</Text>
                        <Divider/>
                    </HStack>
                    {!isLoggingIn && loginError !== '' &&
                    <Alert status="error">
                        <AlertIcon/>
                        {loginError}
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
                        <FormErrorMessage>Please enter a password</FormErrorMessage>
                    </FormControl>
                    <FormControl paddingTop={2}>
                        <Button type={'submit'} w={'100%'} size={'md'} colorScheme={'orange'} onClick={submit}
                                isLoading={isLoggingIn} loadingText={'Logging in'}>Login</Button>
                    </FormControl>
                    <FormControl>
                        <HStack>
                            <Text>Don't have an account? </Text>
                            <Button colorScheme={'orange'} variant={'link'}
                                    onClick={() => history.push('/account/signup')}>
                                Sign up</Button>
                        </HStack>
                    </FormControl>
                </VStack>
            </form>
        </Center>
    )
}
