import React from "react";
import {Box, Button, Flex, Progress, Spacer, Text, useColorModeValue, useDisclosure, VStack} from "@chakra-ui/react";
import {ArrowBackIcon, StarIcon} from "@chakra-ui/icons";
import {useSelector} from "react-redux";
import {selectExerciseCount} from "../../pages/exercise/selectors";
import {selectCurrentUserSession} from "../../pages/userSubtopic/selectors";
import {SessionExitAlert} from "./sessionExitAlert";
import {numStarsForScore} from "../../utils/stars";

export const ExerciseHeader = () => {
    const exerciseCount = useSelector(selectExerciseCount)
    const session = useSelector(selectCurrentUserSession)
    const {isOpen, onOpen, onClose} = useDisclosure()
    const headerColor = useColorModeValue('white', 'black')
    const scoreTextColor = useColorModeValue('gray.700', 'gray.300')

    return (
        <>
            <Box>
                <VStack align={'stretch'}>
                    <Flex px={4} py={2} alignItems={'center'} bg={headerColor}>
                        <Button leftIcon={<ArrowBackIcon/>} size={'sm'} onClick={onOpen}>Exit</Button>
                        <Spacer/>
                        {[...Array(numStarsForScore(session.score))].map((_, i) => (
                            <StarIcon key={i} color={'orange'}/>
                        ))}
                        {[...Array(3 - numStarsForScore(session.score))].map((_, i) => (
                            <StarIcon key={i} color={'gray.500'}/>
                        ))}
                        <Text pl={2} color={scoreTextColor} fontSize={'md'}>
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
