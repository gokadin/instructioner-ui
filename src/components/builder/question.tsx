import React from "react";
import {FormControl, FormLabel, Textarea} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {builderActions} from "../../pages/builder/reducer";
import {selectQuestion} from "../../pages/builder/selectors";

export const Question = () => {
    const questionContent = useSelector(selectQuestion)
    const dispatch = useDispatch()

    const handleChange = (content: string) => {
        dispatch(builderActions.setQuestionContent(content))
        dispatch(builderActions.parseVariables())
    }

    return (
        <FormControl>
            <FormLabel>Question</FormLabel>
            <Textarea placeholder={'Question'} isFullWidth={true} value={questionContent}
                      onChange={(e) => handleChange(e.target.value)}/>
        </FormControl>
    )
}
