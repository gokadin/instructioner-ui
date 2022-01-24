import React from "react";
import {Box, Button, HStack, Input, Radio, Tag, Text} from "@chakra-ui/react";
import {AnswerFieldEntity} from "../../models/answerField.entity";
import {useDispatch, useSelector} from "react-redux";
import {builderActions} from "../../pages/builder/reducer";
import {selectIsInPreview} from "../../pages/builder/selectors";
import Latex from "react-latex-next";
import {DeleteIcon} from "@chakra-ui/icons";

interface Props {
    answerField: AnswerFieldEntity
    preview: string
    index: number
}

export const MultipleChoiceAnswerField = ({answerField, preview, index}: Props) => {
    const isInPreview = useSelector(selectIsInPreview)
    const dispatch = useDispatch()

    const handleChange = (content: string) => {
        dispatch(builderActions.setAnswerFieldContent({index: index, content: content}))
        dispatch(builderActions.parseVariables())
    }

    return (
        <Box>
            <HStack spacing={4}>
                <Radio value={index}/>
                <>
                    <Input placeholder={'Answer'} value={answerField.content}
                           onChange={(e) => handleChange(e.target.value)}/>
                    <Button onClick={() => dispatch(builderActions.removeAnswerField(index))}>
                        <DeleteIcon/>
                    </Button>
                </>
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
        </Box>
    )
}
