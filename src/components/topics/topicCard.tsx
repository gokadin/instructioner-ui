import React, {useEffect} from "react";
import {TopicEntity} from "../../models/topic.entity";
import {Badge, Box, Flex, HStack, Progress, Skeleton, Spacer, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import {ChevronDownIcon, ChevronRightIcon} from "@chakra-ui/icons";
import {SubtopicList} from "./subtopics/subtopics";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reducer";
import {selectSubtopics} from "../../pages/topics/selectors";
import {fetchSubtopics, topicActions} from "../../pages/topics/reducer";
import {
    selectIsUserSubtopicsLoading,
    selectLoadedUserSubtopicIds,
    selectTopicCompletedSubtopics,
    selectTopicScore
} from "../../pages/userSubtopic/selectors";
import {fetchUserSubtopics} from "../../pages/userSubtopic/reducer";

interface Props {
    topic: TopicEntity
}

export const TopicCard = ({topic}: Props) => {
    const completedSubtopicCount = useSelector((state: RootState) => selectTopicCompletedSubtopics(state, topic.id))
    const subtopics = useSelector((state: RootState) => selectSubtopics(state, topic.id))
    const topicScore = useSelector((state: RootState) => selectTopicScore(state, topic.id))
    const isUserSubtopicsLoading = useSelector(selectIsUserSubtopicsLoading)
    const loadedUserSubtopicIds = useSelector(selectLoadedUserSubtopicIds)
    const topicCardColor = useColorModeValue('whitesmoke', 'gray.900')
    const orangeTextColor = useColorModeValue('orange.500', 'orange.300')
    const topicCountColor = useColorModeValue('gray.600', 'gray.400')
    const dispatch = useDispatch()

    useEffect(() => {
        if (!topic.isSubtopicsLoaded && !topic.isSubtopicsLoading) {
            dispatch(fetchSubtopics(topic.id))
        }
    }, [dispatch, topic.id, topic.isSubtopicsLoaded, topic.isSubtopicsLoading])

    useEffect(() => {
        if (subtopics.length > 0) {
            const unloadedSubtopicIds = subtopics.map(subtopic => subtopic.id)
                .filter(id => !isUserSubtopicsLoading[id])
                .filter(id => !loadedUserSubtopicIds[id])
            if (unloadedSubtopicIds.length > 0) {
                dispatch(fetchUserSubtopics(unloadedSubtopicIds))
            }
        }
    }, [dispatch, subtopics, isUserSubtopicsLoading, loadedUserSubtopicIds])

    return <VStack key={topic.id} align={'stretch'} borderWidth={1} borderRadius={'md'} bg={topicCardColor}
                   boxShadow={'lg'} pb={2}>
        <Progress borderTopRadius={'md'} size={'xs'} colorScheme={'green'}
                  max={topic.isSubtopicsLoaded ? subtopics.length : 1}
                  value={completedSubtopicCount}/>
        <Box px={2} onClick={() => dispatch(topicActions.toggleTopicCollapse(topic.id))}>
            <Flex>
                <HStack>
                    <Text fontSize={'2xl'} color={orangeTextColor}>{topic.name}</Text>
                </HStack>
                <Spacer/>
                {topic.isOpen ? <ChevronDownIcon/> : <ChevronRightIcon/>}
            </Flex>
        </Box>
        {!topic.isOpen &&
        <Flex px={2}>
            {topic.isSubtopicsLoaded
                ?
                <Text mt={'0px !important'} color={topicCountColor}>{completedSubtopicCount}/{subtopics.length} topics</Text>
                : <Skeleton h={'24px'}/>
            }
            <Spacer/>
            {completedSubtopicCount > 0 &&
            <Badge borderWidth={'1px'} borderRadius={'md'} fontSize={'small'} size={'md'} bg={'transparent'}
                   color={orangeTextColor}>{topicScore}%</Badge>
            }
        </Flex>
        }
        {topic.isOpen &&
        <SubtopicList topic={topic}/>
        }
    </VStack>
}
