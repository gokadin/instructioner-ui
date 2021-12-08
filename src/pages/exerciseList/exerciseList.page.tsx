import React, {useEffect} from "react";
import {Box, Button, ButtonGroup, HStack, Text, VStack} from "@chakra-ui/react";
import {AddIcon, ArrowBackIcon} from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {ExerciseList} from "../../components/exerciseList/exerciseList";
import {selectExercises, selectLoadState} from "./selectors";
import {useHistory, useParams} from "react-router-dom";
import {exerciseListActions, fetchExercises} from "./reducer";

export const ExerciseListPage = () => {
    const history = useHistory()
    const exercises = useSelector(selectExercises)
    const loadState = useSelector(selectLoadState)
    const dispatch = useDispatch()
    const {subtopicId}: any = useParams()

    useEffect(() => {
        if (subtopicId && loadState.shouldLoad()) {
            dispatch(fetchExercises(subtopicId))
        }
    }, [dispatch, subtopicId])

    const handleChangeTopic = async () => {
        dispatch(exerciseListActions.invalidateList())
        history.push('/admin')
    }

    return (
        <VStack align={'stretch'} px={4}>
            <Box py={2}>
                <HStack>
                    <Text>Exercises for subtopic {subtopicId}</Text>
                    <Button rightIcon={<AddIcon/>}
                            onClick={() => history.push(`/admin/${subtopicId}/new/builder`)}>Add</Button>
                </HStack>
            </Box>
            {exercises &&
            <ExerciseList exercises={exercises}/>
            }
            <ButtonGroup>
                <Button
                    variantColor="teal"
                    variant="outline"
                    leftIcon={<ArrowBackIcon/>}
                    onClick={handleChangeTopic}>Change topic</Button>
            </ButtonGroup>
        </VStack>
    )
}
