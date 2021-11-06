import React, {useRef, useState} from "react";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import {createCourse} from "../../pages/admin/reducer";
import {useDispatch, useSelector} from "react-redux";
import {selectSelectedSubject} from "../../pages/admin/selectors";

interface Props {
    isOpen: boolean
    onClose: () => void
}

export const CreateCourseModal = ({isOpen, onClose}: Props) => {
    const initialRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [nameValue, setNameValue] = useState('')
    const [displayNameValue, setDisplayNameValue] = useState('')
    const selectedSubject = useSelector(selectSelectedSubject)
    const dispatch = useDispatch()

    const submit = () => {
        if (!selectedSubject) {
            console.log('subject is undefined')
            return
        }

        dispatch(createCourse({subjectId: selectedSubject.id, name: nameValue, displayName: displayNameValue}))
        setNameValue('')
        setDisplayNameValue('')
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    Add course
                </ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input ref={initialRef} placeholder={'Name'} value={nameValue}
                               onChange={(e) => setNameValue(e.target.value)}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Display name</FormLabel>
                        <Input placeholder={'Display name'} value={displayNameValue}
                               onChange={(e) => setDisplayNameValue(e.target.value)}/>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={submit}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
