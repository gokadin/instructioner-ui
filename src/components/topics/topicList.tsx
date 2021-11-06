import React from "react";
import {VStack} from "@chakra-ui/react";
import {TopicCard} from "./topicCard";
import {TopicEntity} from "../../models/topic.entity";

interface Props {
    topics: TopicEntity[]
}

export const TopicList = ({topics}: Props) => {

    return <VStack align={'stretch'} px={4} py={2} spacing={4}>
        {topics.map((topic: any) => <TopicCard key={topic.id} topic={topic}/>)}
    </VStack>
}
