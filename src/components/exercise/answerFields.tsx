import React from "react";
import {ExerciseEntity} from "../../models/exercise.entity";
import {HStack, Radio, RadioGroup, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import {exerciseActions} from "../../pages/exercise/reducer";
import Latex from "react-latex-next";
import {useDispatch, useSelector} from "react-redux";
import {
    selectCorrectAnswerFieldIndex,
    selectExerciseIsCompleted,
    selectSelectedAnswerFieldIndex
} from "../../pages/exercise/selectors";
import {CheckIcon, SmallCloseIcon} from "@chakra-ui/icons";

interface Props {
    exercise: ExerciseEntity
}

export const AnswerFields = ({exercise}: Props) => {
    const selectedAnswerFieldIndex = useSelector(selectSelectedAnswerFieldIndex)
    const exerciseIsCompleted = useSelector(selectExerciseIsCompleted)
    const correctAnswerFieldIndex = useSelector(selectCorrectAnswerFieldIndex)
    const dispatch = useDispatch()
    const borderColor = useColorModeValue('gray.400', 'gray.700')

    return (
        <RadioGroup onChange={(e) => dispatch(exerciseActions.setSelectedAnswerField({
            exerciseId: exercise.id,
            answerFieldIndex: parseInt(e)
        }))} value={selectedAnswerFieldIndex}>
            <VStack align={'left'}>
                {exercise.answerFields.map((answerField, i) => {
                    return <HStack px={2} py={2} borderWidth={1} borderRadius={8} borderColor={borderColor} key={i}
                                   align={'stretch'} alignItems={'center'}>
                        {exerciseIsCompleted && correctAnswerFieldIndex === i &&
                        <CheckIcon color={'green'}/>
                        }
                        {exerciseIsCompleted && correctAnswerFieldIndex !== i &&
                        <SmallCloseIcon color={'red'}/>
                        }
                        <Radio isFullWidth={true} key={i} value={i} w={'100%'}>
                            <Text fontSize={'lg'}>
                                <Latex>{answerField.content}</Latex>
                            </Text>
                        </Radio>
                    </HStack>
                })}
            </VStack>
        </RadioGroup>
    )
}
