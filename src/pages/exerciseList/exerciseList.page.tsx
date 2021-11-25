import React, {useEffect} from "react";
import {Box, Button, HStack, Text, VStack} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectSelectedSubtopicId} from "../admin/selectors";
import {ExerciseList} from "../../components/exerciseList/exerciseList";
import {fetchExercises} from "../exercise/reducer";
import {RootState} from "../../reducer";
import {selectExercises} from "../exercise/selectors";
import {useHistory, useParams} from "react-router-dom";
import {adminActions} from "../admin/reducer";

export const ExerciseListPage = () => {
    const history = useHistory()
    const selectedSubtopicId = useSelector(selectSelectedSubtopicId)
    const exercises = useSelector((state: RootState) => selectExercises(state, selectedSubtopicId))
    const dispatch = useDispatch()
    const {subtopicId}: any = useParams()

    useEffect(() => {
        if (subtopicId) {
            dispatch(adminActions.setSubtopic(subtopicId))
            dispatch(fetchExercises(subtopicId))
        }
    }, [dispatch, subtopicId])

    return (
        <VStack align={'stretch'} px={4}>
            <Box py={2}>
                <HStack>
                    <Text>Exercises for subtopic {subtopicId}</Text>
                    <Button rightIcon={<AddIcon/>}
                            onClick={() => history.push(`/admin/${subtopicId}/builder`)}>Add</Button>
                </HStack>
            </Box>
            {exercises &&
            <ExerciseList exercises={exercises}/>
            }
        </VStack>
    )
}
