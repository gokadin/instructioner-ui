import React from "react";
import {Button, HStack, Textarea} from "@chakra-ui/react";
import {HintEntity} from "../../models/hint.entity";
import {builderActions} from "../../pages/builder/reducer";
import {DeleteIcon} from "@chakra-ui/icons";
import {useDispatch} from "react-redux";

interface Props {
    hint: HintEntity
    index: number
}

export const Hint = ({hint, index}: Props) => {
    const dispatch = useDispatch()

    const handleChange = (content: string) => {
        dispatch(builderActions.setHintContent({index: index, content: content}))
        dispatch(builderActions.parseVariables())
    }

    return (
        <HStack spacing={4}>
            <Textarea placeholder={'Hint'} value={hint.content}
                      onChange={(e) => handleChange(e.target.value)}/>
            <Button onClick={() => dispatch(builderActions.removeHint(index))}>
                <DeleteIcon/>
            </Button>
        </HStack>
    )
}
