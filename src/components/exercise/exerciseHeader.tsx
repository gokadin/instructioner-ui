import React from "react";
import {Box, Button, Flex, Progress, Spacer, Text, VStack} from "@chakra-ui/react";
import {ArrowBackIcon, StarIcon} from "@chakra-ui/icons";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCurrentExerciseIndex, selectExerciseCount} from "../../pages/exercise/selectors";

export const ExerciseHeader = () => {
    const history = useHistory()
    const exerciseCount = useSelector(selectExerciseCount)
    const currentExerciseIndex = useSelector(selectCurrentExerciseIndex)

    const handleExit = () => {
        history.push('/topics')
    }

    return (
        <Box pt={2}>
            <VStack align={'stretch'}>
                <Flex px={4} alignItems={'center'}>
                    <Button leftIcon={<ArrowBackIcon/>} size={'sm'} onClick={handleExit}>Exit</Button>
                    <Spacer/>
                    <StarIcon color={'orange'}/>
                    <StarIcon color={'orange'}/>
                    <StarIcon color={'orange'}/>
                    <Text pl={2} color={'gray.300'} fontSize={'md'}>
                        84% correct
                    </Text>
                </Flex>
                <Box>
                    <Progress w={'100%'} value={currentExerciseIndex} size="xs" colorScheme={'green'} min={0}
                              max={exerciseCount}/>
                </Box>
            </VStack>
        </Box>
    )
}
