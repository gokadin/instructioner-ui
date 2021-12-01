import React from "react";
import {VStack} from "@chakra-ui/react";
import {Hint} from "./hint";
import {HintEntity} from "../../models/hint.entity";

interface Props {
    hints: HintEntity[]
}

export const Hints = ({hints}: Props) => {

    return (
        <VStack align={'stretch'}>
            {hints.map((hint, i) => {
                return <Hint key={i} hint={hint}/>
            })}
        </VStack>
    )
}

