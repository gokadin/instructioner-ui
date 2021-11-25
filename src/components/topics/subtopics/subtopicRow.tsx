import React from "react";
import {Badge, Box, Flex, Spacer, Text} from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";
import {SubtopicEntity} from "../../../models/subtopic.entity";
import {topicActions} from "../../../pages/topics/reducer";
import {userSubtopicActions} from "../../../pages/userSubtopic/reducer";
import {exerciseActions} from "../../../pages/exercise/reducer";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {selectUserSubtopic} from "../../../pages/userSubtopic/selectors";
import {RootState} from "../../../reducer";

interface Props {
    subtopic: SubtopicEntity
}

export const SubtopicRow = ({subtopic}: Props) => {
    const userSubtopic = useSelector((state: RootState) => selectUserSubtopic(state, subtopic.id))
    const dispatch = useDispatch()
    const history = useHistory()

    const beginSession = async (subtopicId: string) => {
        await dispatch(topicActions.setSubtopic(subtopicId))
        await dispatch(userSubtopicActions.beginSession(subtopicId))
        await dispatch(exerciseActions.beginSession())
        history.push('/session')
    }

    return <Box key={subtopic.id} px={2} py={2} borderWidth={1} borderColor={'gray.700'} borderRadius={8}>
        <Flex onClick={() => beginSession(subtopic.id)} alignItems={'center'}>
            <Text>{subtopic.name}</Text>
            <Spacer/>
            {subtopic.isCompleted && [...Array(Math.floor(subtopic.score / 33))].map((_, i: number) => {
                return <StarIcon key={i} color={'orange'}/>
            })}
            {userSubtopic &&
            <Text>{userSubtopic.score}%</Text>
            }
            {!userSubtopic &&
            <Badge borderWidth={'1px'} borderRadius={'md'} fontSize={'xx-small'} size={'md'} bg={'transparent'}
                   color={'orange.300'}>new</Badge>
            }
        </Flex>
    </Box>
}
