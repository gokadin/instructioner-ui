import React from "react";
import {Box, HStack, IconButton, Image} from "@chakra-ui/react";
import {HamburgerIcon} from "@chakra-ui/icons";

export const Header = () => {
    return (
        <Box p={2}>
            <HStack>
                <IconButton icon={<HamburgerIcon/>} aria-label={'menu'}/>
                <Image src={'logo.png'} alt={'logo'} />
            </HStack>
        </Box>
    )
}
