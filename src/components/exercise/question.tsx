import React from "react";
import {Box} from "@chakra-ui/react";
import Latex from "react-latex-next";

interface Props {
    content: string
}

export const Question = ({content}: Props) => {

    return (
        <Box p={4}>
            <Latex>{content}</Latex>
        </Box>
    )
}

