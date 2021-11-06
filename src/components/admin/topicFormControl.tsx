import React from "react";
import {Button, FormControl, FormLabel, HStack, Select, useDisclosure} from "@chakra-ui/react";
import {adminActions, fetchSubtopics} from "../../pages/admin/reducer";
import {AddIcon} from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectSelectedCourse, selectSelectedTopic, selectTopics} from "../../pages/admin/selectors";
import {TopicEntity} from "../../models/topic.entity";
import {CreateTopicModal} from "./createTopicModal";

export const TopicFormControl = () => {
    const topics = useSelector(selectTopics)
    const selectedCourse = useSelector(selectSelectedCourse)
    const selectedTopic = useSelector(selectSelectedTopic)
    const dispatch = useDispatch()
    const {isOpen, onOpen, onClose} = useDisclosure()

    const setTopic = (topicId: string) => {
        dispatch(adminActions.setTopic(topicId))
        dispatch(fetchSubtopics(topicId))
    }

    return (
        <>
            <FormControl id={'topic'}>
                <FormLabel>Topic</FormLabel>
                <HStack spacing={4}>
                    <Select placeholder={'<none>'} value={selectedTopic?.id}
                            onChange={(e) => setTopic(e.target.value)}
                            disabled={!selectedCourse}>
                        {topics.map((topic: TopicEntity) => {
                            return <option key={topic.id} value={topic.id}>{topic.displayName}</option>
                        })}
                    </Select>
                    <Button onClick={onOpen}><AddIcon/></Button>
                </HStack>
            </FormControl>
            <CreateTopicModal isOpen={isOpen} onClose={onClose}/>
        </>
    )
}
