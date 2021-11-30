import React from "react";
import {
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Switch,
    Text,
    useColorMode
} from "@chakra-ui/react";
import {MoonIcon, SettingsIcon} from "@chakra-ui/icons";
import {useDispatch} from "react-redux";
import {signOut} from "../../pages/account/reducer";
import {userSubtopicActions} from "../../pages/userSubtopic/reducer";
import {MdLogout} from "react-icons/all";

export const ProfileMenu = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    const dispatch = useDispatch()

    const handleSignOut = () => {
        dispatch(userSubtopicActions.clearState())
        dispatch(signOut())
    };

    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<SettingsIcon/>}
                variant="outline"
            />
            <MenuList>
                <MenuItem closeOnSelect={false}>
                    <HStack w={'full'}>
                        <MoonIcon/>
                        <Text>Dark mode</Text>
                        <Spacer/>
                        <Switch isChecked={colorMode.toLowerCase() === 'dark'}
                                onChange={toggleColorMode}/>
                    </HStack>
                </MenuItem>
                <MenuItem icon={<MdLogout/>} onClick={handleSignOut}>
                    Logout
                </MenuItem>
            </MenuList>
        </Menu>
    )
}
