import React from "react";
import {Box, Divider, Flex} from "@chakra-ui/react";
import {HintEntity} from "../../models/hint.entity";
import {HintHeader} from "./hintHeader";
import {Hints} from "./hints";

interface Props {
    hints: HintEntity[]
    hintIndex: number
}

export const HintContainer = ({hints, hintIndex}: Props) => {
    return (
        <Flex flexDirection={'column'} h={'full'}>
            <Divider mt={'0px !important'}/>
            <HintHeader hintCount={hints.length} hintIndex={hintIndex}/>
            <Box flex={'1'} p={4}>
                <Hints hints={hints} hintIndex={hintIndex}/>
            </Box>
        </Flex>
    )
}

