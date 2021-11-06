import React from "react";
import {HStack} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {selectVariables} from "../../pages/builder/selectors";
import {VariableButton} from "./variableButton";

export const VariableBar = () => {
    const variables = useSelector(selectVariables)

    return (
        <HStack align={'stretch'}>
            {variables.map(variable => <VariableButton variable={variable}/>)}
        </HStack>
    )
}
