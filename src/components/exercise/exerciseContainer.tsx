import React from "react";
import {Box, calc, Divider, Flex, Spacer, Tag, VStack} from "@chakra-ui/react";
import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'
import {ExerciseEntity} from "../../models/exercise.entity";
import {useSelector} from "react-redux";
import {selectIsCorrect} from "../../pages/exercise/selectors";
import {AnswerFields} from "./answerFields";
import {ButtonBar} from "./buttonBar";
import {EmailIcon} from "@chakra-ui/icons";
import {Hints} from "./hints";

interface Props {
    exercise: ExerciseEntity
}

export const ExerciseContainer = ({exercise}: Props) => {
    const isCorrect = useSelector(selectIsCorrect)

    return (
        <VStack h={'full'} align={'stretch'}>
            <Box px={4} py={2}>
                <Flex alignItems={'center'} justifyContent={'space-between'} h={6}>
                    {exercise.isCompleted && isCorrect &&
                    <Tag colorScheme={'green'}>correct!</Tag>
                    }
                    {exercise.isCompleted && !isCorrect &&
                    <Tag colorScheme={'red'}>incorrect</Tag>
                    }
                    <Spacer/>
                    <EmailIcon color={'gray.400'}/>
                </Flex>
            </Box>
            <Divider mt={'0px !important'}/>
            <Box height={'full'} maxH={'full'} overflowY={'auto'}>
                <Box p={4}>
                    <Latex>{exercise.question}</Latex>
                </Box>
                <Hints/>
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
    )
}
