import React, {useEffect} from "react";
import {Button, Flex, FormControl, Spacer, VStack} from "@chakra-ui/react";
import {ArrowForwardIcon} from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {fetchSubjects} from "./reducer";
import {SubjectFormControl} from "../../components/admin/subjectFormControl";
import {CourseFormControl} from "../../components/admin/courseFormControl";
import {TopicFormControl} from "../../components/admin/topicFormControl";
import {SubtopicFormControl} from "../../components/admin/subtopicFormControl";
import {useHistory} from "react-router-dom";
import {selectSelectedSubtopicId} from "./selectors";

export const AdminPage = () => {
    const selectedSubtopicId = useSelector(selectSelectedSubtopicId)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(fetchSubjects())
    }, [dispatch])

    return (
        <VStack px={'10%'} py={4}>
            <SubjectFormControl/>
            <CourseFormControl/>
            <TopicFormControl/>
            <SubtopicFormControl/>
            <FormControl>
                <Flex pt={4}>
                    <Spacer/>
                    <Button colorScheme={'blue'} rightIcon={<ArrowForwardIcon/>} disabled={!selectedSubtopicId}
                            onClick={() => history.push(`/admin/${selectedSubtopicId}/exercises`)}>next</Button>
                </Flex>
            </FormControl>
        </VStack>
    )
}
