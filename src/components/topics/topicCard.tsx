import React from "react";
import {TopicEntity} from "../../models/topic.entity";
import {Box, Flex, HStack, Progress, Spacer, Text, VStack} from "@chakra-ui/react";
import {ChevronDownIcon, ChevronRightIcon} from "@chakra-ui/icons";
import {SubtopicList} from "./subtopics/subtopics";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reducer";
import {selectCompletedSubtopicCount} from "../../pages/topics/selectors";
import {topicActions} from "../../pages/topics/reducer";

interface Props {
    topic: TopicEntity
}

export const TopicCard = ({topic}: Props) => {
    const subtopicCount = useSelector((state: RootState) => selectCompletedSubtopicCount(state, topic.id))
    const dispatch = useDispatch()

    return <VStack key={topic.id} align={'stretch'} borderWidth={1} borderRadius={'md'} bg={'gray.900'} pb={2}>
        <Progress borderTopRadius={'md'} size={'xs'} colorScheme={'green'} max={topic.subtopics.length}
                  value={subtopicCount}/>
        <Box px={2} onClick={() => dispatch(topicActions.toggleTopicCollapse(topic.id))}>
            <Flex>
                <HStack>
                    <Text fontSize={'xl'} color={'orange'}>{topic.name}</Text>
                </HStack>
                <Spacer/>
                {topic.isCollapsed ? <ChevronRightIcon/> : <ChevronDownIcon/>}
            </Flex>
        </Box>
        {topic.isCollapsed &&
        <Text mt={'0px !important'} px={2}
              color={'gray.400'}>{subtopicCount}/{topic.subtopics.length} topics</Text>
        }
        {!topic.isCollapsed &&
        <SubtopicList topic={topic}/>
        }
    </VStack>
}
