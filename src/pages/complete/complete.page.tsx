import React, {useEffect, useState} from "react";
import {Button, Center, CircularProgress, CircularProgressLabel, HStack, Text, VStack} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUserSession} from "../userSubtopic/selectors";
import {useHistory} from "react-router-dom";
import {StarIcon} from "@chakra-ui/icons";
import {completeSession} from "../userSubtopic/reducer";
import {numStarsForScore} from "../../utils/stars";

export const CompletePage = () => {
    const session = useSelector(selectCurrentUserSession)
    const history = useHistory()
    const dispatch = useDispatch()
    const [score, setScore] = useState(0)

    const handleComplete = () => {
        dispatch(completeSession())
        history.push('/topics')
    }

    // this is a hack to force an animation on the progress circle
    useEffect(() => {
        setScore(0)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setScore(session.score)
        }, 300)
    }, [session])

    return (
        <VStack h={'full'} align={'stretch'} spacing={4}>
            <Center h={'40%'}>
                <CircularProgress size={200} value={score} color="orange.300">
                    <CircularProgressLabel color={'orange.300'}>{session.score}%</CircularProgressLabel>
                </CircularProgress>
            </Center>
            <Center h={'40px'}>
                <HStack>
                    {[...Array(numStarsForScore(session.score))].map((_, i) => (
                        <StarIcon key={i} fontSize={'xx-large'} color={'orange'}/>
                    ))}
                    {[...Array(3 - numStarsForScore(session.score))].map((_, i) => (
                        <StarIcon key={i} fontSize={'xx-large'} color={'gray.500'}/>
                    ))}
                </HStack>
            </Center>
            <Center h={'40px'} pb={'20px'}>
                <HStack>
                    <Text fontSize={'larger'}>Completed </Text>
                    <Text fontSize={'larger'} color={'orange.300'}>{session.exerciseCount}</Text>
                    <Text fontSize={'larger'}> exercises</Text>
                </HStack>
            </Center>
            <Center h={'50%'} alignItems={'flex-end'} marginTop={'0px !important'} bg={'gray.900'}>
                <Button w={'100%'} h={'60px'} bg={'orange.300'} borderRadius={0} color={'gray.900'} fontWeight={'bold'}
                        fontSize={'lg'}
                        onClick={handleComplete}>Complete!</Button>
            </Center>
        </VStack>
    )
}
