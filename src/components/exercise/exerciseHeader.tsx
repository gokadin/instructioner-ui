import React from "react";
import {Box, Button, Flex, Progress, Spacer, Text, useDisclosure, VStack} from "@chakra-ui/react";
import {ArrowBackIcon, StarIcon} from "@chakra-ui/icons";
import {useSelector} from "react-redux";
import {selectExerciseCount} from "../../pages/exercise/selectors";
import {selectCurrentUserSession} from "../../pages/userSubtopic/selectors";
import {SessionExitAlert} from "./sessionExitAlert";

export const ExerciseHeader = () => {
    const exerciseCount = useSelector(selectExerciseCount)
    const session = useSelector(selectCurrentUserSession)
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <>
            <Box>
                <VStack align={'stretch'}>
                    <Flex px={4} py={2} alignItems={'center'} bg={'black'}>
                        <Button leftIcon={<ArrowBackIcon/>} size={'sm'} onClick={onOpen}>Exit</Button>
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
            <SessionExitAlert isOpen={isOpen} onClose={onClose}/>
        </>
    )
}
