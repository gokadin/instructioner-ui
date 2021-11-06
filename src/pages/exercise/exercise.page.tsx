import React, {useEffect} from "react";
import {Box, StackDivider, VStack} from "@chakra-ui/react"
import {ExerciseHeader} from "../../components/exercise/exerciseHeader";
import {ExerciseContainer} from "../../components/exercise/exerciseContainer";
import {useDispatch, useSelector} from "react-redux";
import {fetchExercises} from "./reducer";
import {selectCurrentExercise} from "./selectors";
import {selectSelectedSubtopic} from "../topics/selectors";
import {topicActions} from "../topics/reducer";

export const ExercisePage = () => {
    const exercise = useSelector(selectCurrentExercise)
    const selectedSubtopic = useSelector(selectSelectedSubtopic)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!selectedSubtopic) {
            dispatch(topicActions.setSubtopic('8822c8a6-71ac-4316-95a1-eea8a73990f9'))
            dispatch(fetchExercises('8822c8a6-71ac-4316-95a1-eea8a73990f9'))
            console.log('subtopic is not selected')
            return
        }
        dispatch(fetchExercises(selectedSubtopic.id))
    }, [dispatch, selectedSubtopic])

    return (
        <VStack align="stretch">
            <Box>
                <ExerciseHeader/>
            </Box>
            <Box px={0} pt={0} marginTop={'0px !important'}>
                {exercise &&
                <ExerciseContainer exercise={exercise}/>
                }
            </Box>
        </VStack>
    )
}
