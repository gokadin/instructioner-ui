import React from "react";
import {Button, FormControl, FormLabel, HStack, Text, VStack} from "@chakra-ui/react";
import {builderActions} from "../../pages/builder/reducer";
import {AddIcon} from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectHints, selectHintsPreview, selectIsInPreview} from "../../pages/builder/selectors";
import {HintEntity} from "../../models/hint.entity";
import {Hint} from "./hint";
import {Hints} from "../exercise/hints";

export const HintsField = () => {
    const hints = useSelector(selectHints)
    const hintsPreview = useSelector(selectHintsPreview)
    const isInPreview = useSelector(selectIsInPreview)
    const dispatch = useDispatch()

    return (
        <FormControl>
            <FormLabel>
                <HStack>
                    <Text>Hints</Text>
                    <Button size={'sm'} onClick={() => dispatch(builderActions.addHint())}><AddIcon/></Button>
                </HStack>
            </FormLabel>
            {isInPreview &&
            <Hints hints={hintsPreview}/>
            }
            {!isInPreview &&
            <VStack align={'stretch'}>
                {hints.map((hint: HintEntity, i) => {
                    return <Hint key={i} hint={hint} index={i}/>
                })}
            </VStack>
            }
        </FormControl>
    )
}
