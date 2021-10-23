import React from "react";
import {Button, Flex, FormControl, FormLabel, HStack, Select, Spacer, useDisclosure, VStack} from "@chakra-ui/react";
import {AddIcon, ArrowForwardIcon} from "@chakra-ui/icons";
import {useSelector} from "react-redux";
import {selectSelectedSubject, selectSubjects} from "./selectors";
import {SubjectEntity} from "../../models/subject.entity";
import {CreateSubjectModal} from "../../components/admin/createSubjectModal";

export const AdminPage = () => {
    const subjects = useSelector(selectSubjects)
    const selectedSubject = useSelector(selectSelectedSubject)
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <>
            <VStack px={'10%'} py={4}>
                <FormControl id={'subject'}>
                    <FormLabel>Subject</FormLabel>
                    <HStack spacing={4}>
                        <Select placeholder={'<none>'}>
                            {subjects.map((subject: SubjectEntity) => {
                                return <option value={subject.id}>{subject.name}</option>
                            })}
                        </Select>
                        <Button onClick={onOpen}><AddIcon/></Button>
                    </HStack>
                </FormControl>
                <FormControl id={'course'}>
                    <FormLabel>Course</FormLabel>
                    <Select placeholder={'<none>'} disabled={!selectedSubject}>
                        <option value={'s'}>Course 1</option>
                        <option value={'s2'}>Course 2</option>
                    </Select>
                </FormControl>
                <FormControl id={'topic'}>
                    <FormLabel>Topic</FormLabel>
                    <Select placeholder={'<none>'}>
                        <option value={'s'}>Topic 1</option>
                    </Select>
                </FormControl>
                <FormControl id={'subtopic'}>
                    <FormLabel>Subtopic</FormLabel>
                    <Select placeholder={'<none>'}>
                        <option value={'s'}>Subtopic 1</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <Flex pt={4}>
                        <Spacer/>
                        <Button colorScheme={'blue'} rightIcon={<ArrowForwardIcon/>}>next</Button>
                    </Flex>
                </FormControl>
            </VStack>
            <CreateSubjectModal isOpen={isOpen} onClose={onClose}/>
        </>
    )
}
