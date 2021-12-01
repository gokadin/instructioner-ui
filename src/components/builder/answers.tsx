import React from "react";
import {MultipleChoiceAnswerField} from "./multipleChoiceAnswerField";
import {Button, FormControl, FormLabel, HStack, RadioGroup, Text, VStack} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    selectAnswerFields,
    selectAnswerFieldsPreview,
    selectCorrectAnswerFieldIndex,
    selectIsInPreview
} from "../../pages/builder/selectors";
import {AnswerFieldEntity} from "../../models/answerField.entity";
import {builderActions} from "../../pages/builder/reducer";

export const Answers = () => {
    const answerFields = useSelector(selectAnswerFields)
    const answerFieldsPreview = useSelector(selectAnswerFieldsPreview)
    const isInPreview = useSelector(selectIsInPreview)
    const correctAnswerFieldIndex = useSelector(selectCorrectAnswerFieldIndex)
    const dispatch = useDispatch()

    return (
        <FormControl>
            <FormLabel>
                <HStack>
                    <Text>Answers</Text>
                    <Button size={'sm'} onClick={() => dispatch(builderActions.addAnswerField())}><AddIcon/></Button>
                </HStack>
            </FormLabel>
            <RadioGroup value={correctAnswerFieldIndex}>
                {isInPreview &&
                <VStack align={'stretch'}>
                    {answerFieldsPreview.map((answerFieldPreview: AnswerFieldEntity, i) => {
                        return <MultipleChoiceAnswerField key={i} answerField={answerFieldPreview} index={i}/>
                    })}
                </VStack>
                }
                {!isInPreview &&
                <VStack align={'stretch'}>
                    {answerFields.map((answerField: AnswerFieldEntity, i) => {
                        return <MultipleChoiceAnswerField key={i} answerField={answerField} index={i}/>
                    })}
                </VStack>
                }
            </RadioGroup>
        </FormControl>
    )
}
