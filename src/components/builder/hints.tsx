import React from "react";
import {Button, FormControl, FormLabel, HStack, Text, VStack} from "@chakra-ui/react";
import {builderActions} from "../../pages/builder/reducer";
import {AddIcon} from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectHints} from "../../pages/builder/selectors";
import {HintEntity} from "../../models/hint.entity";
import {Hint} from "./hint";

export const Hints = () => {
    const hints = useSelector(selectHints)
    const dispatch = useDispatch()

    return (
        <FormControl>
            <FormLabel>
                <HStack>
                    <Text>Hints</Text>
                    <Button size={'sm'} onClick={() => dispatch(builderActions.addHint())}><AddIcon/></Button>
                </HStack>
            </FormLabel>
            <VStack align={'stretch'}>
                {hints.map((hint: HintEntity, i) => {
                    return <Hint key={i} hint={hint} index={i}/>
                })}
            </VStack>
        </FormControl>
    )
}
