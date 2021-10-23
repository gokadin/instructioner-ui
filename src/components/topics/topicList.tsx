import React from "react";
import {VStack} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {selectTopics} from "../../pages/topics/selectors";
import {TopicCard} from "./topicCard";

export const TopicList = () => {
    const topics = useSelector(selectTopics)

    return <VStack align={'stretch'} px={4} py={2} spacing={4}>
        {topics.map((topic: any) => <TopicCard key={topic.id} topic={topic}/>)}
    </VStack>
}
