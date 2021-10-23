import React from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Center,
    Divider,
    Flex,
    HStack,
    Radio,
    RadioGroup,
    Spacer,
    Text,
    VStack
} from "@chakra-ui/react";
import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'
import {ExerciseEntity} from "../../../models/exercise.entity";
import {useDispatch, useSelector} from "react-redux";
import {exerciseActions} from "../../../pages/exercise/reducer";
import {selectShowSuccess, selectSelectedAnswerFieldId, selectShowFailure} from "../../../pages/exercise/selectors";
import {RootState} from "../../../reducer";

interface Props {
    exercise: ExerciseEntity
}

export const ExerciseContainer = ({exercise}: Props) => {
    const selectedAnswerFieldId = useSelector((state: RootState) => selectSelectedAnswerFieldId(state, exercise.id))
    const showSuccess = useSelector((state: RootState) => selectShowSuccess(state, exercise.id))
    const showFailure = useSelector((state: RootState) => selectShowFailure(state, exercise.id))
    const dispatch = useDispatch()

    const highlightColor = () => {
        if (showSuccess) {
            return 'green.500'
        }

        if (showFailure) {
            return 'red.500'
        }

        return ''
    }

    return (
        <VStack align={'stretch'} borderWidth={'1px'} borderRadius={'md'} borderColor={highlightColor()}>
            <Box px={4} py={2} bg={highlightColor() !== '' ? highlightColor() : 'gray.900'} borderTopRadius={'md'}>
                <Flex>
                    <Center>
                        <Text>
                            Exercise 3 of 8
                        </Text>
                    </Center>
                    <Spacer/>
                    <Center>
                        <Text>
                            Attempt 0/3
                        </Text>
                    </Center>
                </Flex>
            </Box>
            <Divider mt={'0px !important'}/>
            <Box p={4}>
                <Latex>{exercise.question}</Latex>
            </Box>
            <Divider/>
            <Center px={4} py={2} bg={'gray.900'} mt={'0px !important'}>
                <HStack>
                    <ButtonGroup spacing={2}>
                        <Button w={'110px'} variant={'outline'}>Show hint (2)</Button>
                        <Button w={'110px'} variant={'outline'}>Show answer</Button>
                        <Button w={'110px'} variant={'solid'} colorScheme={'teal'}
                                onClick={() => dispatch(exerciseActions.markCompleted(exercise.id))}>Check</Button>
                    </ButtonGroup>
                </HStack>
            </Center>
            <Divider mt={'0px !important'}/>
            <Box px={4} py={2}>
                <RadioGroup onChange={(e) => dispatch(exerciseActions.setSelectedAnswerField({
                    exerciseId: exercise.id,
                    answerFieldId: e
                }))} value={selectedAnswerFieldId}>
                    <VStack align={'left'}>
                        {exercise.answerFields.map(answerField => {
                            return <Radio key={answerField.id} value={answerField.id}>
                                <Latex>{answerField.content}</Latex>
                            </Radio>
                        })}
                    </VStack>
                </RadioGroup>
            </Box>
        </VStack>
    )
}
