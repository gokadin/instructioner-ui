import React from "react";
import {Box, Divider, Skeleton, Stack, VStack} from "@chakra-ui/react";
import 'katex/dist/katex.min.css'
import {ExerciseEntity} from "../../models/exercise.entity";
import {useSelector} from "react-redux";
import {selectHints} from "../../pages/exercise/selectors";
import {AnswerFields} from "./answerFields";
import {ButtonBar} from "./buttonBar";
import {Hints} from "./hints";
import {Question} from "./question";
import {LoadState} from "../../utils/loadState";
import {FailMessage} from "../../utils/FailMessage";
import {ExerciseHeader} from "./exerciseHeader";

interface Props {
    exercise: ExerciseEntity
    sessionLoadState: LoadState
}

export const ExerciseContainer = ({exercise, sessionLoadState}: Props) => {
    const hints = useSelector(selectHints)

    if (sessionLoadState.isLoading()) {
        return <Stack p={4}>
            <Skeleton h={'100px'}/>
            <Skeleton h={'100px'}/>
            <Skeleton h={'100px'}/>
        </Stack>
    }

    if (sessionLoadState.hasFailed()) {
        return <FailMessage message={'Please try reloading.'}/>
    }

    if (sessionLoadState.isReady()) {
        return (
            <Box h={'full'} px={0} pt={0} marginTop={'0px !important'}>
                <VStack h={'full'} align={'stretch'}>
                    <ExerciseHeader exercise={exercise}/>
                    <Divider mt={'0px !important'}/>
                    <Box height={'full'} maxH={'full'} overflowY={'auto'}>
                        <Question content={exercise.question}/>
                        <Hints hints={hints}/>
                    </Box>
                    <VStack w={'full'} justifyContent={'flex-end'}>
                        <Divider mt={'0px !important'}/>
                        <Box w={'full'} px={4} py={2}>
                            <AnswerFields exercise={exercise}/>
                        </Box>
                        <Divider/>
                        <ButtonBar exercise={exercise}/>
                    </VStack>
                </VStack>
            </Box>
        )
    }

    return <></>
}
