import React from "react";
import {IconButton, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {MoonIcon, SettingsIcon} from "@chakra-ui/icons";
import {useDispatch} from "react-redux";
import {signOut} from "../../pages/account/reducer";
import {userSubtopicActions} from "../../pages/userSubtopic/reducer";

export const ProfileMenu = () => {
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
                <MenuItem icon={<MoonIcon/>} onClick={handleSignOut}>
                    Logout
                </MenuItem>
            </MenuList>
        </Menu>
    )
}
