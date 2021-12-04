import React from "react";
import {Box, FormControl, FormLabel, Textarea} from "@chakra-ui/react";
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
            <FormLabel>Question</FormLabel>
            {isInPreview &&
            <Question content={preview}/>
            }
            {!isInPreview &&
            <Box position={'relative'} h={'160px'}>
                <Box marginLeft={'1px'} fontSize={'lg'} letterSpacing={'1px'} p={2} lineHeight={'lg'}
                     position={'absolute'} h={'full'} overflowY={'auto'}
                     w={'full'} color={'transparent'}
                     whiteSpace={'pre-wrap'}
                     wordBreak={'break-word'}>
                    {parse(questionContentFormatted)}
                </Box>
                <Textarea letterSpacing={'1px'} lineHeight={'lg'} fontSize={'lg'} spellCheck={'false'} p={2} h={'full'}
                          placeholder={'Question'}
                          isFullWidth={true} value={questionContent}
                          onChange={(e) => handleChange(e.target.value)}/>
            </Box>
            }
        </FormControl>
    )
}
