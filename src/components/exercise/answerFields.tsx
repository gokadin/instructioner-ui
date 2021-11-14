import React from "react";
import {ExerciseEntity} from "../../models/exercise.entity";
import {HStack, Radio, RadioGroup, VStack} from "@chakra-ui/react";
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

    return (
        <RadioGroup onChange={(e) => dispatch(exerciseActions.setSelectedAnswerField({
            exerciseId: exercise.id,
            answerFieldIndex: parseInt(e)
        }))} value={selectedAnswerFieldIndex}>
            <VStack align={'left'}>
                {exercise.answerFields.map((answerField, i) => {
                    return <HStack key={i} align={'stretch'} alignItems={'center'}>
                        {exerciseIsCompleted && correctAnswerFieldIndex === i &&
                        <CheckIcon color={'green'}/>
                        }
                        {exerciseIsCompleted && correctAnswerFieldIndex !== i &&
                        <SmallCloseIcon color={'red'}/>
                        }
                        <Radio key={i} value={i} w={'100%'}>
                            <Latex>{answerField.content}</Latex>
                        </Radio>
                    </HStack>
                })}
            </VStack>
        </RadioGroup>
    )
}
