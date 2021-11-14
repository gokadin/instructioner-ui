import React from "react";
import {Skeleton, Stack} from "@chakra-ui/react";
import {TopicEntity} from "../../../models/topic.entity";
import {useSelector} from "react-redux";
import {selectSubtopics} from "../../../pages/topics/selectors";
import {RootState} from "../../../reducer";
import {SubtopicEntity} from "../../../models/subtopic.entity";
import {SubtopicRow} from "./subtopicRow";

interface Props {
    topic: TopicEntity
}

export const SubtopicList = ({topic}: Props) => {
    const subtopics = useSelector((state: RootState) => selectSubtopics(state, topic.id))

    if (!topic.isSubtopicsLoaded) {
        return <Stack p={4}>
            <Skeleton h={'20px'}/>
            <Skeleton h={'20px'}/>
            <Skeleton h={'20px'}/>
        </Stack>
    }

    return <>
        {subtopics.map((subtopic: SubtopicEntity) => {
            return <SubtopicRow key={subtopic.id} subtopic={subtopic}/>
        })}
    </>
}
