import React from "react";
import {HintEntity} from "../../models/hint.entity";
import {useDispatch} from "react-redux";
import {Hint} from "./hint";
import {exerciseActions} from "../../pages/exercise/reducer";
import SwipeableViews from "react-swipeable-views";

interface Props {
    hints: HintEntity[]
    hintIndex: number
}

export const Hints = ({hints, hintIndex}: Props) => {
    const dispatch = useDispatch()

    const handleIndexChange = (index: number) => {
        dispatch(exerciseActions.showHintAtIndex(index))
    }

    // return <Flex w={'full'} h={'full'} p={4} overflowX={'auto'} flexWrap={'nowrap'} transition={'transform 0.7s ease-in-out'} style={{}}>
    //     <Hint hint={hints[hintIndex]}/>
    //     <Hint hint={hints[hintIndex]}/>
    // </Flex>

    return <SwipeableViews style={{height: '100%', maxWidth: '100vw'}} containerStyle={{height: '100%'}}
                           index={hintIndex}
                           onChangeIndex={handleIndexChange} enableMouseEvents={true}>
        {hints.map((hint, i) => {
            return <Hint key={i} hint={hint}/>
        })}
    </SwipeableViews>
}
