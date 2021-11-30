import React from "react";
import {Box, Button, HStack, IconButton, Image, Spacer, useColorModeValue} from "@chakra-ui/react";
import {HamburgerIcon} from "@chakra-ui/icons";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../pages/account/selectors";
import {ProfileMenu} from "../account/profileMenu";
import {useHistory} from "react-router-dom";

export const Header = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const headerColor = useColorModeValue('white', 'black')
    const history = useHistory()

    return (
        <Box bg={headerColor} p={2} marginBottom={2} boxShadow={'md'}>
            <HStack>
                <IconButton icon={<HamburgerIcon/>} aria-label={'menu'}/>
                <Image src={'/logo_no_text.png'} h={'30px'} alt={'logo'}/>
                <Spacer/>
                {!isLoggedIn
                    ? <Button size={'sm'} onClick={() => history.push('/account/login')}>Login</Button>
                    : <ProfileMenu/>
                }
            </HStack>
        </Box>
    )
}
