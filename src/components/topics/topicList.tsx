import React from "react";
import {Skeleton, Stack, VStack} from "@chakra-ui/react";
import {TopicCard} from "./topicCard";
import {TopicEntity} from "../../models/topic.entity";
import {LoadState} from "../../utils/loadState";
import {FailMessage} from "../../utils/FailMessage";

interface Props {
    topics: TopicEntity[]
    loadState: LoadState
}

export const TopicList = ({topics, loadState}: Props) => {
    if (loadState.isLoading()) {
        return <Stack p={4}>
            <Skeleton h={'60px'}/>
            <Skeleton h={'60px'}/>
            <Skeleton h={'60px'}/>
        </Stack>
    }

    if (loadState.hasFailed()) {
        return <FailMessage message={'Please try reloading.'}/>
    }

    if (loadState.isReady()) {
        return <VStack align={'stretch'} px={4} py={2} spacing={4}>
            {topics.map((topic: any) => <TopicCard key={topic.id} topic={topic}/>)}
        </VStack>
    }

    return <></>
}
