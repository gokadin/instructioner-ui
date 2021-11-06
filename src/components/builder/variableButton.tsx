import React from "react";
import {VariableEntity} from "../../models/variable.entity";
import {Badge, useDisclosure} from "@chakra-ui/react";
import {VariableModal} from "./variableModal";

interface Props {
    variable: VariableEntity
}

export const VariableButton = ({variable}: Props) => {
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <>
            <Badge colorScheme={'orange'} onClick={onOpen}>
                {variable.name}
            </Badge>
            <VariableModal variable={variable} isOpen={isOpen} onClose={onClose}/>
        </>
    )
}
