import React from "react";
import {Button, FormControl, FormLabel, HStack, Select, useDisclosure} from "@chakra-ui/react";
import {adminActions, fetchTopics} from "../../pages/admin/reducer";
import {AddIcon} from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectCourses, selectSelectedCourse, selectSelectedSubject} from "../../pages/admin/selectors";
import {CourseEntity} from "../../models/course.entity";
import {CreateCourseModal} from "./createCourseModal";

export const CourseFormControl = () => {
    const courses = useSelector(selectCourses)
    const selectedCourse = useSelector(selectSelectedCourse)
    const selectedSubject = useSelector(selectSelectedSubject)
    const dispatch = useDispatch()
    const {isOpen, onOpen, onClose} = useDisclosure()

    const setCourse = (courseId: string) => {
        dispatch(adminActions.setCourse(courseId))
        dispatch(fetchTopics(courseId))
    }

    return (
        <>
            <FormControl id={'course'}>
                <FormLabel>Course</FormLabel>
                <HStack spacing={4}>
                    <Select placeholder={'<none>'} value={selectedCourse?.id}
                            onChange={(e) => setCourse(e.target.value)}
                            disabled={!selectedSubject}>
                        {courses.map((course: CourseEntity) => {
                            return <option key={course.id} value={course.id}>{course.displayName}</option>
                        })}
                    </Select>
                    <Button onClick={onOpen}><AddIcon/></Button>
                </HStack>
            </FormControl>
            <CreateCourseModal isOpen={isOpen} onClose={onClose}/>
        </>
    )
}
