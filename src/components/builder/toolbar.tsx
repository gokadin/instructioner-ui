import React from "react";
import {HStack, Spacer, Switch, Text} from "@chakra-ui/react";
import {VariableBar} from "./variableBar";
import {SettingsIcon} from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectIsInPreview} from "../../pages/builder/selectors";
import {builderActions} from "../../pages/builder/reducer";

export const Toolbar = () => {
    const isInPreview = useSelector(selectIsInPreview)
    const dispatch = useDispatch()

    return (
        <HStack align={'stretch'} bg={'gray.900'} w={'100%'} px={4} py={2} pacing={4}>
            <VariableBar/>
            <Spacer/>
            <HStack alignItems={'center'} spacing={4}>
                <Text>Preview</Text>
                <Switch onChange={() => dispatch(builderActions.togglePreview())} isChecked={isInPreview}/>
                <SettingsIcon/>
            </HStack>
        </HStack>
    )
}
