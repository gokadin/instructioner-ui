import React, {useEffect} from "react";
import {Button, Flex, FormControl, Spacer, VStack} from "@chakra-ui/react";
import {Toolbar} from "../../components/builder/toolbar";
import {Question} from "../../components/builder/question";
import {Answers} from "../../components/builder/answers";
import {Hints} from "../../components/builder/hints";
import {useDispatch} from "react-redux";
import {builderActions, createExercise} from "./reducer";
import {Name} from "../../components/builder/name";
import {useHistory, useParams} from "react-router-dom";
import {adminActions} from "../admin/reducer";
import {DifficultySelector} from "../../components/builder/difficultySelector";
import {ArrowBackIcon} from "@chakra-ui/icons";

export const BuilderPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {subtopicId}: any = useParams()

    useEffect(() => {
        if (subtopicId) {
            dispatch(adminActions.setSubtopic(subtopicId))
        }
    }, [dispatch, subtopicId])

    const handleCreate = () => {
        dispatch(createExercise())
        history.push(`/admin/${subtopicId}/exercises`)
    }

    const handleCancel = () => {
        dispatch(builderActions.clearState())
        history.push(`/admin/${subtopicId}/exercises`)
    }

    return (
        <VStack>
            <Toolbar/>
            <VStack w={'100%'} pt={2} px={'10%'}>
                <Name/>
                <DifficultySelector/>
                <Question/>
                <Hints/>
                <Answers/>
                <FormControl>
                    <Flex pt={4}>
                        <Button
                            variantColor="teal"
                            variant="outline"
                            leftIcon={<ArrowBackIcon/>}
                            onClick={handleCancel}>Cancel</Button>
                        <Spacer/>
                        <Button onClick={handleCreate} colorScheme={'blue'}>Create</Button>
                    </Flex>
                </FormControl>
            </VStack>
        </VStack>
    )
}
