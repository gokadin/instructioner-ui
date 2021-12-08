import React from "react";
import {Badge, Button, Table, Tbody, Td, Tfoot, Th, Thead, Tr, useToast} from "@chakra-ui/react";
import {ExerciseEntity} from "../../models/exercise.entity";
import {DeleteIcon} from "@chakra-ui/icons";
import {useDispatch} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {removeExercise} from "../../pages/exerciseList/reducer";

interface Props {
    exercises: ExerciseEntity[]
}

export const ExerciseList = ({exercises}: Props) => {
    const history = useHistory()
    const {subtopicId}: any = useParams()
    const dispatch = useDispatch()
    const toast = useToast()

    const handleRemove = async (exercise: ExerciseEntity) => {
        await dispatch(removeExercise(exercise))
        toast({
            title: 'Success',
            description: 'Exercise deleted',
            status: "success",
            duration: 5000,
            isClosable: true,
        })
    }

    return (
        <Table variant='simple'>
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Difficulty</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {exercises.map((exercise, i) => {
                    return <Tr>
                        <Td><Button variant={'link'} onClick={() => history.push(`/admin/${subtopicId}/${exercise.id}/builder`)}>{exercise.name}</Button></Td>
                        <Td>
                            <Badge>{exercise.difficulty}</Badge>
                        </Td>
                        <Td>
                            <DeleteIcon onClick={() => handleRemove(exercise)}/>
                        </Td>
                    </Tr>
                })}
            </Tbody>
            <Tfoot>
                <Tr>
                    <Th>Count: {exercises.length}</Th>
                </Tr>
            </Tfoot>
        </Table>
    )
}
