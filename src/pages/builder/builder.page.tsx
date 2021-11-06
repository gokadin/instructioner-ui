import React, {useEffect} from "react";
import {Button, Flex, FormControl, Spacer, VStack} from "@chakra-ui/react";
import {Toolbar} from "../../components/builder/toolbar";
import {Question} from "../../components/builder/question";
import {Answers} from "../../components/builder/answers";
import {Hints} from "../../components/builder/hints";
import {useDispatch, useSelector} from "react-redux";
import {createExercise} from "./reducer";
import {Name} from "../../components/builder/name";
import {useHistory} from "react-router-dom";
import {selectSelectedSubtopic} from "../admin/selectors";
import {adminActions} from "../admin/reducer";

export const BuilderPage = () => {
    const selectedSubtopic = useSelector(selectSelectedSubtopic)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (!selectedSubtopic) {
            history.push('/admin')
            return
        }
        dispatch(adminActions.setSubtopic(selectedSubtopic.id))
    }, [dispatch, history, selectedSubtopic])

    const handleCreate = () => {
        dispatch(createExercise())
        history.push('/admin/exercises')
    }

    return (
        <VStack>
            <Toolbar/>
            <VStack w={'100%'} pt={2} px={'10%'}>
                <Name/>
                <Question/>
                <Hints/>
                <Answers/>
                <FormControl>
                    <Flex pt={4}>
                        <Spacer/>
                        <Button onClick={handleCreate} colorScheme={'blue'}>Create</Button>
                    </Flex>
                </FormControl>
            </VStack>
        </VStack>
    )
}
