import React from "react";
import {Box, Divider, Flex, VStack} from "@chakra-ui/react";
import 'katex/dist/katex.min.css'
import {ExerciseEntity} from "../../models/exercise.entity";
import {useSelector} from "react-redux";
import {selectAreHintsShown, selectCurrentHintIndex} from "../../pages/exercise/selectors";
import {AnswerFields} from "./answerFields";
import {ButtonBar} from "./buttonBar";
import {HintContainer} from "./hintContainer";
import {Question} from "./question";
import {ExerciseHeader} from "./exerciseHeader";

interface Props {
    exercise: ExerciseEntity
}

export const ExerciseContainer = ({exercise}: Props) => {
    const currentHintIndex = useSelector(selectCurrentHintIndex)
    const areHintsShown = useSelector(selectAreHintsShown)

    return (
        <Box h={'full'} px={0} pt={0} marginTop={'0px !important'}>
            <Flex h={'full'} align={'stretch'} flexDirection={'column'}>
                <ExerciseHeader exercise={exercise}/>
                <Divider mt={'0px !important'}/>
                <Flex flexDirection={'column'} height={'full'} maxH={'full'} overflowY={'auto'} flex={'1'}>
                    <Question content={exercise.question}/>
                    {areHintsShown &&
                    <Box flex={'1'} h={'full'}>
                        <HintContainer hints={exercise.hints} hintIndex={currentHintIndex}/>
                    </Box>
                    }
                </Flex>
                <VStack w={'full'} justifyContent={'flex-end'}>
                    <Divider mt={'0px !important'}/>
                    <Box w={'full'} px={4} py={2}>
                        <AnswerFields exercise={exercise}/>
                    </Box>
                    <Divider/>
                    <ButtonBar exercise={exercise}/>
                </VStack>
            </Flex>
        </Box>
    )
}
