import React from "react";
import {Box, Button, Flex, Progress, Spacer, Text, VStack} from "@chakra-ui/react";
import {ArrowBackIcon, StarIcon} from "@chakra-ui/icons";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectExerciseCount} from "../../pages/exercise/selectors";
import {selectCurrentUserSession} from "../../pages/userSubtopic/selectors";

export const ExerciseHeader = () => {
    const history = useHistory()
    const exerciseCount = useSelector(selectExerciseCount)
    const session = useSelector(selectCurrentUserSession)

    const handleExit = () => {
        history.push('/topics')
    }

    return (
        <Box>
            <VStack align={'stretch'}>
                <Flex px={4} py={2} alignItems={'center'} bg={'black'}>
                    <Button leftIcon={<ArrowBackIcon/>} size={'sm'} onClick={handleExit}>Exit</Button>
                    <Spacer/>
                    <StarIcon color={'orange'}/>
                    <StarIcon color={'orange'}/>
                    <StarIcon color={'orange'}/>
                    <Text pl={2} color={'gray.300'} fontSize={'md'}>
                        {session.score}% correct
                    </Text>
                </Flex>
                <Box marginTop={'0px !important'}>
                    <Progress sx={{
                        ".css-po99uc": {
                            transition: "width ease .6s"
                        }
                    }} w={'100%'} value={session.exerciseCount} size="xs" colorScheme={'green'} min={0}
                              max={exerciseCount}/>
                </Box>
            </VStack>
        </Box>
    )
}
