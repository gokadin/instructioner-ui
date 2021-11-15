import React from "react";
import {HintEntity} from "../../models/hint.entity";
import Latex from "react-latex-next";
import {Box, Divider, VStack} from "@chakra-ui/react";
import {QuestionIcon} from "@chakra-ui/icons";

interface Props {
    hint: HintEntity
}

export const Hint = ({hint}: Props) => {
    if (!hint.isVisible) {
        return <></>
    }

    return <VStack align={'stretch'}>
        <Divider mt={'0px !important'}/>
        <Box p={4} position={'relative'}>
            <QuestionIcon color={'orange'} position={'absolute'} top={0} right={2}/>
            <Latex>{hint.content}</Latex>
        </Box>
    </VStack>
}
