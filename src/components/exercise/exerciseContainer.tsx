import React from "react";
import {Box, Divider, Flex, Spacer, Tag, VStack} from "@chakra-ui/react";
import 'katex/dist/katex.min.css'
import {ExerciseEntity} from "../../models/exercise.entity";
import {useSelector} from "react-redux";
import {selectHints, selectIsCorrect} from "../../pages/exercise/selectors";
import {AnswerFields} from "./answerFields";
import {ButtonBar} from "./buttonBar";
import {Icon} from "@chakra-ui/icons";
import {Hints} from "./hints";
import {MdFlag} from "react-icons/all";
import {Question} from "./question";

interface Props {
    exercise: ExerciseEntity
}

export const ExerciseContainer = ({exercise}: Props) => {
    const isCorrect = useSelector(selectIsCorrect)
    const hints = useSelector(selectHints)

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
                    <Icon as={MdFlag} color={'gray.400'}/>
                </Flex>
            </Box>
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
    )
}
