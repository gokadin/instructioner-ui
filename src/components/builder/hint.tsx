import React from "react";
import {Box, Button, HStack, Tag, Text, Textarea} from "@chakra-ui/react";
import {HintEntity} from "../../models/hint.entity";
import {builderActions} from "../../pages/builder/reducer";
import {DeleteIcon} from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import Latex from "react-latex-next";
import {selectIsInPreview} from "../../pages/builder/selectors";

interface Props {
    hint: HintEntity
    preview: string
    index: number
}

export const Hint = ({hint, preview, index}: Props) => {
    const isInPreview = useSelector(selectIsInPreview)
    const dispatch = useDispatch()

    const handleChange = (content: string) => {
        dispatch(builderActions.setHintContent({index: index, content: content}))
        dispatch(builderActions.parseVariables())
    }

    return (
        <>
            <HStack spacing={4}>
                <Textarea placeholder={'Hint'} value={hint.content}
                          onChange={(e) => handleChange(e.target.value)}/>
                <Button onClick={() => dispatch(builderActions.removeHint(index))}>
                    <DeleteIcon/>
                </Button>
            </HStack>
            {isInPreview &&
            <Box borderWidth={1} position={'relative'}>
                <Tag position={'absolute'} right={'4px'} top={'4px'}>Preview</Tag>
                <Box p={4}>
                    <Text fontSize={'lg'}>
                        <Latex>{preview}</Latex>
                    </Text>
                </Box>
            </Box>
            }
        </>
    )
}
