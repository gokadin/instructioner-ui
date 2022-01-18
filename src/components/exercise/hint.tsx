import React from "react";
import {Box, Text} from "@chakra-ui/react";
import Latex from "react-latex-next";
import {HintEntity} from "../../models/hint.entity";

interface Props {
    hint: HintEntity
}

export const Hint = ({hint}: Props) => {
    return <Box p={4}>
        <Text fontSize={'lg'}>
            <Latex>{hint.content}</Latex>
        </Text>
    </Box>
}
