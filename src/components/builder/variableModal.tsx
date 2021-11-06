import React, {useRef} from "react";
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
import {useDispatch} from "react-redux";
import {VariableEntity} from "../../models/variable.entity";
import {builderActions} from "../../pages/builder/reducer";

interface Props {
    variable: VariableEntity
    isOpen: boolean
    onClose: () => void
}

export const VariableModal = ({variable, isOpen, onClose}: Props) => {
    const initialRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const dispatch = useDispatch()

    return (
        <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    Edit variable
                </ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <FormControl>
                        <FormLabel>Range start</FormLabel>
                        <Input ref={initialRef} placeholder={'Range start'} value={variable.rangeStart}
                               onChange={(e) => dispatch(builderActions.setVariableRangeStart({
                                   name: variable.name,
                                   value: e.target.value
                               }))}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Range end</FormLabel>
                        <Input placeholder={'Range end'} value={variable.rangeEnd}
                               onChange={(e) => dispatch(builderActions.setVariableRangeEnd({
                                   name: variable.name,
                                   value: e.target.value
                               }))}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Default</FormLabel>
                        <Input placeholder={'Default'} value={variable.default}
                               onChange={(e) => dispatch(builderActions.setVariableDefault({
                                   name: variable.name,
                                   value: e.target.value
                               }))}/>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
