import React from "react";
import {Button, HStack, Input, Radio} from "@chakra-ui/react";
import {AnswerFieldEntity} from "../../models/answerField.entity";
import {useDispatch, useSelector} from "react-redux";
import {builderActions} from "../../pages/builder/reducer";
import {selectIsInPreview} from "../../pages/builder/selectors";
import Latex from "react-latex-next";
import {DeleteIcon} from "@chakra-ui/icons";

interface Props {
    answerField: AnswerFieldEntity
    index: number
}

export const MultipleChoiceAnswerField = ({answerField, index}: Props) => {
    const isInPreview = useSelector(selectIsInPreview)
    const dispatch = useDispatch()

    const handleChange = (content: string) => {
        dispatch(builderActions.setAnswerFieldContent({index: index, content: content}))
        dispatch(builderActions.parseVariables())
    }

    return (
        <HStack spacing={4}>
            <Radio value={index}/>
            {isInPreview &&
            <Latex>{answerField.content}</Latex>
            }
            {!isInPreview &&
            <>
                <Input placeholder={'Answer'} value={answerField.content}
                       onChange={(e) => handleChange(e.target.value)}/>
                <Button onClick={() => dispatch(builderActions.removeAnswerField(index))}>
                    <DeleteIcon/>
                </Button>
            </>
            }
        </HStack>
    )
}
