import React, {useEffect} from "react";
import {Box, Button, HStack, Text, VStack} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectSelectedSubtopic} from "../admin/selectors";
import {ExerciseList} from "../../components/exerciseList/exerciseList";
import {fetchExercises} from "../exercise/reducer";
import {RootState} from "../../reducer";
import {selectExercises} from "../exercise/selectors";
import {useHistory, useParams} from "react-router-dom";
import {adminActions} from "../admin/reducer";

export const ExerciseListPage = () => {
    const history = useHistory()
    const selectedSubtopic = useSelector(selectSelectedSubtopic)
    const exercises = useSelector((state: RootState) => selectExercises(state, selectedSubtopic?.id))
    const dispatch = useDispatch()
    const {subtopicId}: any = useParams()

    useEffect(() => {
        if (subtopicId) {
            dispatch(adminActions.setSubtopic(subtopicId))
            dispatch(fetchExercises(subtopicId))
        }
    }, [dispatch, subtopicId])

    if (!selectedSubtopic) {
        return <div></div>
    }

    return (
        <VStack align={'stretch'} px={4}>
            <Box py={2}>
                <HStack>
                    <Text>Exercises for subtopic {selectedSubtopic.name}</Text>
                    <Button rightIcon={<AddIcon/>} onClick={() => history.push('/admin/builder')}>Add</Button>
                </HStack>
            </Box>
            {exercises &&
            <ExerciseList exercises={exercises}/>
            }
        </VStack>
    )
}
