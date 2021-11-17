import React, {useEffect} from "react";
import {Box, Skeleton, Stack, VStack} from "@chakra-ui/react"
import {ExerciseHeader} from "../../components/exercise/exerciseHeader";
import {ExerciseContainer} from "../../components/exercise/exerciseContainer";
import {useDispatch, useSelector} from "react-redux";
import {fetchExercises} from "./reducer";
import {selectCurrentExercise, selectCurrentSessionSubtopicId, selectIsCurrentExerciseLoaded} from "./selectors";
import {selectSelectedSubtopic} from "../topics/selectors";
import {useHistory} from "react-router-dom";

export const ExercisePage = () => {
    const exercise = useSelector(selectCurrentExercise)
    const isExerciseLoaded = useSelector(selectIsCurrentExerciseLoaded)
    const currentSessionSubtopicId = useSelector(selectCurrentSessionSubtopicId)
    const selectedSubtopic = useSelector(selectSelectedSubtopic)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (!selectedSubtopic) {
            console.error('subtopic is not selected')
            history.push('/topics')
            return
        }
        if (!isExerciseLoaded || currentSessionSubtopicId !== selectedSubtopic.id) {
            dispatch(fetchExercises(selectedSubtopic.id))
        }
    }, [dispatch, history, selectedSubtopic, isExerciseLoaded, currentSessionSubtopicId])

    return (
        <VStack h={'full'} align="stretch">
            <Box>
                <ExerciseHeader/>
            </Box>
            <Box h={'full'} px={0} pt={0} marginTop={'0px !important'}>
                {isExerciseLoaded
                    ? <ExerciseContainer exercise={exercise}/>
                    : <Stack p={4}>
                        <Skeleton h={'100px'}/>
                        <Skeleton h={'100px'}/>
                        <Skeleton h={'100px'}/>
                    </Stack>
                }
            </Box>
        </VStack>
    )
}
