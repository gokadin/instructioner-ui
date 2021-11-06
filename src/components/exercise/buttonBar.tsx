import React from "react";
import {Button, HStack, IconButton} from "@chakra-ui/react";
import {exerciseActions} from "../../pages/exercise/reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    selectAnswerIsSelected,
    selectCorrectAnswerFieldIndex,
    selectHasHiddenHint,
    selectIsLastExercise
} from "../../pages/exercise/selectors";
import {ExerciseEntity} from "../../models/exercise.entity";
import {QuestionIcon, ViewIcon} from "@chakra-ui/icons";
import {useHistory} from "react-router-dom";

interface Props {
    exercise: ExerciseEntity
}

export const ButtonBar = ({exercise}: Props) => {
    const correctAnswerFieldIndex = useSelector(selectCorrectAnswerFieldIndex)
    const selectedAnswerIsSelected = useSelector(selectAnswerIsSelected)
    const isLastExercise = useSelector(selectIsLastExercise)
    const hasHiddenHint = useSelector(selectHasHiddenHint)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleComplete = () => {
        history.push('/topics')
    }

    return (
        <HStack px={4} py={2} bg={'gray.900'} mt={'0px !important'} borderBottomRadius={'md'} spacing={3}>
            <IconButton aria-label={'Show answer'} size={'md'} variant={'outline'} colorScheme={'red'}
                        icon={<ViewIcon/>}
                        onClick={() => dispatch(exerciseActions.showAnswer(correctAnswerFieldIndex))}/>
            <IconButton aria-label={'Hints'} size={'md'} variant={'outline'} colorScheme={'orange'} lineHeight={'md'}
                        isDisabled={!hasHiddenHint}
                        icon={<QuestionIcon/>} onClick={() => dispatch(exerciseActions.showNextHint())}/>
            {exercise.isCompleted && !isLastExercise &&
            <Button w={'100%'} variant={'solid'} colorScheme={'green'}
                    onClick={() => dispatch(exerciseActions.next())}>Next</Button>
            }
            {!exercise.isCompleted &&
            <Button w={'100%'} variant={'outline'} colorScheme={'green'} disabled={!selectedAnswerIsSelected}
                    onClick={() => dispatch(exerciseActions.markCompleted(exercise.id))}>Check</Button>
            }
            {exercise.isCompleted && isLastExercise &&
            <Button w={'100%'} variant={'solid'} colorScheme={'green'} onClick={handleComplete}>Complete!</Button>
            }
        </HStack>
    )
}
