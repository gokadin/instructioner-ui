import React from "react";
import {FormControl, FormLabel, Textarea} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {builderActions} from "../../pages/builder/reducer";
import {selectIsInPreview, selectQuestion, selectQuestionPreview} from "../../pages/builder/selectors";
import {Question} from "../exercise/question";

export const QuestionField = () => {
    const questionContent = useSelector(selectQuestion)
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
            <Textarea placeholder={'Question'} isFullWidth={true} value={questionContent}
                      onChange={(e) => handleChange(e.target.value)}/>
            }
        </FormControl>
    )
}
