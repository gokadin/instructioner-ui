import React from "react";
import {Box, Flex, Spacer, Text} from "@chakra-ui/react";
import {LockIcon, StarIcon} from "@chakra-ui/icons";
import {TopicEntity} from "../../../models/topic.entity";
import {useDispatch, useSelector} from "react-redux";
import {selectSubtopics} from "../../../pages/topics/selectors";
import {RootState} from "../../../reducer";
import {SubtopicEntity} from "../../../models/subtopic.entity";
import {topicActions} from "../../../pages/topics/reducer";
import {useHistory} from "react-router-dom";

interface Props {
    topic: TopicEntity
}

export const SubtopicList = ({topic}: Props) => {
    const subtopics = useSelector((state: RootState) => selectSubtopics(state, topic.id))
    const dispatch = useDispatch()
    const history = useHistory()

    const beginSession = (subtopicId: string) => {
        dispatch(topicActions.setSubtopic(subtopicId))
        history.push('/session')
    }

    return <>
        {subtopics.map((subtopic: SubtopicEntity) => {
            return <Box key={subtopic.id} px={2}>
                <Flex onClick={() => beginSession(subtopic.id)}>
                    <Text>{subtopic.name}</Text>
                    <Spacer/>
                    {subtopic.isCompleted && [...Array(Math.floor(subtopic.score / 33))].map((_, i: number) => {
                        return <StarIcon key={i} color={'orange'}/>
                    })}
                    {!subtopic.isCompleted &&
                    <LockIcon color={'gray.400'}/>
                    }
                </Flex>
            </Box>
        })}
    </>
}
