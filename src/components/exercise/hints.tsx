import React from "react";
import {HintEntity} from "../../models/hint.entity";
import {useDispatch} from "react-redux";
import SwipeableViews from "react-swipeable-views";
import {Hint} from "./hint";
import {exerciseActions} from "../../pages/exercise/reducer";

interface Props {
    hints: HintEntity[]
    hintIndex: number
}

export const Hints = ({hints, hintIndex}: Props) => {
    const dispatch = useDispatch()

    const handleIndexChange = (index: number) => {
        dispatch(exerciseActions.showHintAtIndex(index))
    }

    return <SwipeableViews style={{height: '100%'}} containerStyle={{height: '100%'}} index={hintIndex}
                           onChangeIndex={handleIndexChange} enableMouseEvents={true}>
        {hints.map((hint, i) => {
            return <Hint key={i} hint={hint}/>
        })}
    </SwipeableViews>
}
