import React from "react";
import {HStack, Spacer} from "@chakra-ui/react";
import {VariableBar} from "./variableBar";
import {SettingsIcon} from "@chakra-ui/icons";

export const Toolbar = () => {
    return (
        <HStack align={'stretch'} bg={'gray.900'} w={'100%'} px={4} py={2}>
            <VariableBar/>
            <Spacer/>
            <SettingsIcon/>
        </HStack>
    )
}
