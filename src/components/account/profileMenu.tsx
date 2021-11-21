import React from "react";
import {IconButton, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {MoonIcon, SettingsIcon} from "@chakra-ui/icons";
import {useDispatch} from "react-redux";
import {signOut} from "../../pages/account/reducer";

export const ProfileMenu = () => {
    const dispatch = useDispatch()

    const handleSignOut = () => {
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
                <MenuItem icon={<MoonIcon/>} onClick={handleSignOut}>
                    Logout
                </MenuItem>
            </MenuList>
        </Menu>
    )
}
