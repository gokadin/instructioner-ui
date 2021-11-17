import React from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text
} from "@chakra-ui/react";
import {useHistory} from "react-router-dom";

interface Props {
    isOpen: boolean
    onClose: () => void
}

export const SessionExitAlert = ({isOpen, onClose}: Props) => {
    const history = useHistory()

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    Are you sure?
                </ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Text>Discard you progress and exit?</Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={() => history.push('/topics')}>
                        Exit
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
