import React from "react";
import {HintEntity} from "../../models/hint.entity";
import Latex from "react-latex-next";
import {Box, Divider, VStack} from "@chakra-ui/react";

interface Props {
    hint: HintEntity
}

export const Hint = ({hint}: Props) => {
    if (!hint.isVisible) {
        return <></>
    }

    return <VStack align={'stretch'}>
        <Divider mt={'0px !important'}/>
        <Box p={4}>
            <Latex>{hint.content}</Latex>
        </Box>
    </VStack>
}
