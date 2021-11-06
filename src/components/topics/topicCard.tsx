import React, {useEffect, useState} from "react";
import {TopicEntity} from "../../models/topic.entity";
import {Box, Flex, HStack, Progress, Spacer, Text, VStack} from "@chakra-ui/react";
import {ChevronDownIcon, ChevronRightIcon} from "@chakra-ui/icons";
import {SubtopicList} from "./subtopics/subtopics";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reducer";
import {selectCompletedSubtopicCount, selectSubtopics} from "../../pages/topics/selectors";
import {fetchSubtopics} from "../../pages/topics/reducer";

interface Props {
    topic: TopicEntity
}

export const TopicCard = ({topic}: Props) => {
    const subtopicCount = useSelector((state: RootState) => selectCompletedSubtopicCount(state, topic.id))
    const subtopics = useSelector((state: RootState) => selectSubtopics(state, topic.id))
    const [isCollapsed, setIsCollapsed] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('called', topic.id)
        dispatch(fetchSubtopics(topic.id))
    }, [dispatch, topic.id])

    return <VStack key={topic.id} align={'stretch'} borderWidth={1} borderRadius={'md'} bg={'gray.900'} pb={2}>
        <Progress borderTopRadius={'md'} size={'xs'} colorScheme={'green'} max={subtopics.length}
                  value={subtopicCount}/>
        <Box px={2} onClick={() => setIsCollapsed(!isCollapsed)}>
            <Flex>
                <HStack>
                    <Text fontSize={'xl'} color={'orange'}>{topic.name}</Text>
                </HStack>
                <Spacer/>
                {isCollapsed ? <ChevronRightIcon/> : <ChevronDownIcon/>}
            </Flex>
        </Box>
        {isCollapsed &&
        <Text mt={'0px !important'} px={2}
              color={'gray.400'}>{subtopicCount}/{subtopics.length} topics</Text>
        }
        {!isCollapsed &&
        <SubtopicList topic={topic}/>
        }
    </VStack>
}
