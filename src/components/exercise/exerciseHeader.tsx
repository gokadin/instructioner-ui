import React from "react";
import {Box, Flex, Spacer, Tag} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {MdFlag} from "react-icons/all";
import {useSelector} from "react-redux";
import {selectIsCorrect} from "../../pages/exercise/selectors";
import {ExerciseEntity} from "../../models/exercise.entity";

interface Props {
    exercise: ExerciseEntity
}

export const ExerciseHeader = ({exercise}: Props) => {
    const isCorrect = useSelector(selectIsCorrect)

    return (
        <Box px={4} py={2}>
            <Flex alignItems={'center'} justifyContent={'space-between'} h={6}>
                {exercise.isCompleted && isCorrect &&
                <Tag colorScheme={'green'}>correct!</Tag>
                }
                {exercise.isCompleted && !isCorrect &&
                <Tag colorScheme={'red'}>incorrect</Tag>
                }
                <Spacer/>
                <Icon as={MdFlag} color={'gray.400'}/>
            </Flex>
        </Box>
    )
}
