import React from "react";
import {Badge, Table, Tbody, Td, Tfoot, Th, Thead, Tr} from "@chakra-ui/react";
import {ExerciseEntity} from "../../models/exercise.entity";
import {DeleteIcon} from "@chakra-ui/icons";
import {useDispatch} from "react-redux";
import {removeExercise} from "../../pages/builder/reducer";

interface Props {
    exercises: ExerciseEntity[]
}

export const ExerciseList = ({exercises}: Props) => {
    const dispatch = useDispatch()

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
                        <Td>{exercise.name}</Td>
                        <Td>
                            <Badge>{exercise.difficulty}</Badge>
                        </Td>
                        <Td>
                            <DeleteIcon onClick={() => dispatch(removeExercise(exercise))}/>
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
