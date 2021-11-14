import React from "react";
import {Flex, Spacer, Text, VStack} from "@chakra-ui/react";
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
        <VStack align={'stretch'}>
            {exercises.map((exercise, i) => {
                return <Flex key={i}>
                    <Text>{i}-{exercise.name}</Text>
                    <Spacer/>
                    <DeleteIcon onClick={() => dispatch(removeExercise(exercise))}/>
                </Flex>
            })}
        </VStack>
    )
}
