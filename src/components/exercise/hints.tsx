import React from "react";
import {VStack} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {selectHints} from "../../pages/exercise/selectors";
import {Hint} from "./hint";

export const Hints = () => {
    const hints = useSelector(selectHints)

    return (
        <VStack align={'stretch'}>
            {hints.map((hint, i) => {
                return <Hint key={i} hint={hint}/>
            })}
        </VStack>
    )
}

