import React from "react";
import {Box, FormControl, Tag, Textarea} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {builderActions} from "../../pages/builder/reducer";
import {
    selectIsInPreview,
    selectQuestion,
    selectQuestionFormatted,
    selectQuestionPreview
} from "../../pages/builder/selectors";
import {Question} from "../exercise/question";
import parse from 'html-react-parser';
import './editor.css'

export const QuestionField = () => {
    const questionContent = useSelector(selectQuestion)
    const questionContentFormatted = useSelector(selectQuestionFormatted)
    const preview = useSelector(selectQuestionPreview)
    const isInPreview = useSelector(selectIsInPreview)
    const dispatch = useDispatch()

    const handleChange = (content: string) => {
        dispatch(builderActions.setQuestionContent(content))
        dispatch(builderActions.parseVariables())
    }

    return (
        <FormControl>
            <Box borderWidth={1} p={2}>Question</Box>
            <Box position={'relative'}>
                <Box marginLeft={'1px'} fontSize={'lg'} letterSpacing={'1px'} p={2} lineHeight={'lg'}
                     position={'absolute'} h={'full'} overflowY={'auto'}
                     w={'full'} color={'transparent'}
                     whiteSpace={'pre-wrap'}
                     wordBreak={'break-word'}>
                    {parse(questionContentFormatted)}
                </Box>
                <Box borderWidth={1}>
                    <Textarea letterSpacing={'1px'} lineHeight={'lg'} fontSize={'lg'} spellCheck={'false'} p={2}
                              h={'full'}
                              placeholder={'Question'}
                              isFullWidth={true} value={questionContent}
                              variant={'unstyled'}
                              onChange={(e) => handleChange(e.target.value)}/>
                </Box>
            </Box>
            {isInPreview &&
            <Box borderWidth={1} position={'relative'}>
                <Tag position={'absolute'} right={'4px'} top={'4px'}>Preview</Tag>
                <Question content={preview}/>
            </Box>
            }
        </FormControl>
    )
}
