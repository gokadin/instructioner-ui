import React, {useEffect} from "react";
import {Box, VStack} from "@chakra-ui/react"
import {SessionHeader} from "../../components/exercise/sessionHeader";
import {ExerciseContainer} from "../../components/exercise/exerciseContainer";
import {useDispatch, useSelector} from "react-redux";
import {fetchExercises} from "./reducer";
import {selectCurrentExercise, selectSessionLoadState} from "./selectors";
import {selectSelectedSubtopic} from "../topics/selectors";
import {useHistory} from "react-router-dom";

export const ExercisePage = () => {
    const exercise = useSelector(selectCurrentExercise)
    const sessionLoadState = useSelector(selectSessionLoadState)
    const selectedSubtopic = useSelector(selectSelectedSubtopic)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (!selectedSubtopic) {
            console.error('subtopic is not selected')
            history.push('/topics')
            return
        }

        dispatch(fetchExercises(selectedSubtopic.id))
    }, [dispatch, history, selectedSubtopic])

    return (
        <VStack h={'full'} align="stretch">
            <Box>
                <SessionHeader/>
            </Box>
            {selectedSubtopic &&
            <ExerciseContainer exercise={exercise} sessionLoadState={sessionLoadState}/>
            }
        </VStack>
    )
}
