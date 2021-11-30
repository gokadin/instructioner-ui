import React from "react";
import {Badge, Box, Flex, HStack, Spacer, Text, useColorModeValue} from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";
import {SubtopicEntity} from "../../../models/subtopic.entity";
import {topicActions} from "../../../pages/topics/reducer";
import {userSubtopicActions} from "../../../pages/userSubtopic/reducer";
import {exerciseActions} from "../../../pages/exercise/reducer";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {selectUserSubtopic} from "../../../pages/userSubtopic/selectors";
import {RootState} from "../../../reducer";
import {numStarsForScore} from "../../../utils/stars";

interface Props {
    subtopic: SubtopicEntity
}

export const SubtopicRow = ({subtopic}: Props) => {
    const userSubtopic = useSelector((state: RootState) => selectUserSubtopic(state, subtopic.id))
    const dispatch = useDispatch()
    const history = useHistory()
    const borderColor = useColorModeValue('gray.400', 'gray.700')

    const beginSession = async (subtopicId: string) => {
        await dispatch(topicActions.setSubtopic(subtopicId))
        await dispatch(userSubtopicActions.beginSession(subtopicId))
        await dispatch(exerciseActions.beginSession())
        history.push('/session')
    }

    return <Box key={subtopic.id} px={2} py={2} borderWidth={1} borderColor={borderColor} borderRadius={8}>
        <Flex onClick={() => beginSession(subtopic.id)} alignItems={'center'}>
            <Text>{subtopic.name}</Text>
            <Spacer/>
            {userSubtopic &&
            <HStack spacing={1}>
                {userSubtopic && [...Array(numStarsForScore(userSubtopic.score))].map((_, i: number) => {
                    return <StarIcon key={i} color={'orange'}/>
                })}
                <Text>{userSubtopic.score}%</Text>
            </HStack>
            }
            {!userSubtopic &&
            <Badge borderWidth={'1px'} borderRadius={'md'} fontSize={'xx-small'} size={'md'} bg={'transparent'}
                   color={'orange.300'}>new</Badge>
            }
        </Flex>
    </Box>
}
