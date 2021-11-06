import React from "react";
import {Button, FormControl, FormLabel, HStack, Select, useDisclosure} from "@chakra-ui/react";
import {adminActions, fetchCourses} from "../../pages/admin/reducer";
import {SubjectEntity} from "../../models/subject.entity";
import {AddIcon} from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectSelectedSubject, selectSubjects} from "../../pages/admin/selectors";
import {CreateSubjectModal} from "./createSubjectModal";

export const SubjectFormControl = () => {
    const subjects = useSelector(selectSubjects)
    const selectedSubject = useSelector(selectSelectedSubject)
    const dispatch = useDispatch()
    const {isOpen, onOpen, onClose} = useDisclosure()

    const setSubject = (subjectId: string) => {
        dispatch(adminActions.setSubject(subjectId))
        dispatch(fetchCourses(subjectId))
    }

    return (
        <>
            <FormControl id={'subject'}>
                <FormLabel>Subject</FormLabel>
                <HStack spacing={4}>
                    <Select placeholder={'<none>'} value={selectedSubject?.id}
                            onChange={(e) => setSubject(e.target.value)}>
                        {subjects.map((subject: SubjectEntity) => {
                            return <option key={subject.id} value={subject.id}>{subject.displayName}</option>
                        })}
                    </Select>
                    <Button onClick={onOpen}><AddIcon/></Button>
                </HStack>
            </FormControl>
            <CreateSubjectModal isOpen={isOpen} onClose={onClose}/>
        </>
    )
}
