import React, {useEffect} from "react";
import {Box, StackDivider, VStack} from "@chakra-ui/react"
import {ExerciseHeader} from "../../components/exercise/header/exerciseHeader";
import {ExerciseContainer} from "../../components/exercise/container/exerciseContainer";
import {useDispatch, useSelector} from "react-redux";
import {fetchExercises} from "./reducer";
import {selectCurrentExercise} from "./selectors";

export const ExercisePage = () => {
    const exercise = useSelector(selectCurrentExercise)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchExercises())
    }, [dispatch])

    return (
        <VStack align="stretch" divider={<StackDivider borderColor="gray.700" />}>
            <Box>
                <ExerciseHeader/>
            </Box>
            <Box px={4} pt={2}>
                {exercise &&
                <ExerciseContainer exercise={exercise}/>
                }
            </Box>
        </VStack>
    )
}
