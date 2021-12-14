import React from "react";
import {HintEntity} from "../../models/hint.entity";
import {Hint} from "../exercise/hint";
import {VStack} from "@chakra-ui/react";

interface Props {
    hints: HintEntity[];
}

export const HintsPreview = ({hints}: Props) => {
    return (
        <VStack>
            {hints.map((hint, i) => {
                return <Hint key={i} hint={hint}/>
            })}
        </VStack>
    )
}
