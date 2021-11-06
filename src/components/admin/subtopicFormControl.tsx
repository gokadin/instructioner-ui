import React from "react";
import {Button, FormControl, FormLabel, HStack, Select, useDisclosure} from "@chakra-ui/react";
import {adminActions} from "../../pages/admin/reducer";
import {AddIcon} from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectSelectedSubtopic, selectSelectedTopic, selectSubtopics} from "../../pages/admin/selectors";
import {SubtopicEntity} from "../../models/subtopic.entity";
import {CreateSubtopicModal} from "./createSubtopicModal";

export const SubtopicFormControl = () => {
    const subtopics = useSelector(selectSubtopics)
    const selectedTopic = useSelector(selectSelectedTopic)
    const selectedSubtopic = useSelector(selectSelectedSubtopic)
    const dispatch = useDispatch()
    const {isOpen, onOpen, onClose} = useDisclosure()

    const setSubtopic = (subtopicId: string) => {
        dispatch(adminActions.setSubtopic(subtopicId))
    }

    return (
        <>
            <FormControl id={'subtopic'}>
                <FormLabel>Subtopic</FormLabel>
                <HStack spacing={4}>
                    <Select placeholder={'<none>'} value={selectedSubtopic?.id}
                            onChange={(e) => setSubtopic(e.target.value)}
                            disabled={!selectedTopic}>
                        {subtopics.map((subtopic: SubtopicEntity) => {
                            return <option key={subtopic.id} value={subtopic.id}>{subtopic.displayName}</option>
                        })}
                    </Select>
                    <Button onClick={onOpen}><AddIcon/></Button>
                </HStack>
            </FormControl>
            <CreateSubtopicModal isOpen={isOpen} onClose={onClose}/>
        </>
    )
}
