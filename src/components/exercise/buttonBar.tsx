import React from "react";
import {Button, HStack, IconButton, useColorModeValue} from "@chakra-ui/react";
import {exerciseActions} from "../../pages/exercise/reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    selectAnswerIsSelected,
    selectAreHintsShown,
    selectCorrectAnswerFieldIndex,
    selectIsCorrect,
    selectIsLastExercise
} from "../../pages/exercise/selectors";
import {ExerciseEntity} from "../../models/exercise.entity";
import {QuestionIcon, ViewIcon} from "@chakra-ui/icons";
import {useHistory} from "react-router-dom";
import {completeSession, userSubtopicActions} from "../../pages/userSubtopic/reducer";

interface Props {
    exercise: ExerciseEntity
}

export const ButtonBar = ({exercise}: Props) => {
    const correctAnswerFieldIndex = useSelector(selectCorrectAnswerFieldIndex)
    const isCorrect = useSelector(selectIsCorrect)
    const selectedAnswerIsSelected = useSelector(selectAnswerIsSelected)
    const isLastExercise = useSelector(selectIsLastExercise)
    const areHintsShown = useSelector(selectAreHintsShown)
    const dispatch = useDispatch()
    const history = useHistory()
    const bgColor = useColorModeValue('gray.200', 'gray.900')

    const handleCheckExercise = () => {
        dispatch(exerciseActions.markCompleted(exercise.id))
        dispatch(userSubtopicActions.completeExercise({duration: 2, isCorrect}))
    }

    const handleShowAnswer = () => {
        dispatch(exerciseActions.showAnswer(correctAnswerFieldIndex))
        dispatch(exerciseActions.markCompleted(exercise.id))
        dispatch(userSubtopicActions.completeExercise({duration: 2, isCorrect: false}))
    }

    const handleNextExercise = () => {
        if (isLastExercise) {
            dispatch(completeSession())
            history.push('/session/complete')
        } else {
            dispatch(exerciseActions.next())
        }
    }

    return (
        <HStack w={'full'} alignItems={'center'} h={'16'} align={'stretch'} px={4} py={2} bg={bgColor}
                mt={'0px !important'} borderBottomRadius={'md'} spacing={3}>
            <IconButton aria-label={'Show answer'} size={'lg'} variant={'outline'} colorScheme={'red'}
                        disabled={exercise.isCompleted}
                        icon={<ViewIcon/>}
                        onClick={handleShowAnswer}/>
            <IconButton aria-label={'Hints'} size={'lg'} variant={'outline'} colorScheme={'orange'} lineHeight={'md'}
                        disabled={areHintsShown}
                        icon={<QuestionIcon/>} onClick={() => dispatch(exerciseActions.revealHints())}/>
            {exercise.isCompleted &&
            <Button w={'100%'} h={'100%'} variant={'solid'} colorScheme={'green'}
                    onClick={handleNextExercise}>Next</Button>
            }
            {!exercise.isCompleted &&
            <Button w={'100%'} h={'100%'} variant={'outline'} colorScheme={'green'} disabled={!selectedAnswerIsSelected}
                    onClick={handleCheckExercise}>Check</Button>
            }
        </HStack>
    )
}
