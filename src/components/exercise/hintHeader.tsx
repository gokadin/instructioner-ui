import React from "react";
import {Center, HStack} from "@chakra-ui/react";
import {Icon, QuestionOutlineIcon} from "@chakra-ui/icons";
import {VscCircleFilled, VscCircleOutline} from "react-icons/all";
import {useDispatch} from "react-redux";
import {exerciseActions} from "../../pages/exercise/reducer";

interface Props {
    hintIndex: number
    hintCount: number
}

export const HintHeader = ({hintIndex, hintCount}: Props) => {
    const dispatch = useDispatch()

    const handleHintIndicatorClick = (index: number) => {
        dispatch(exerciseActions.showHintAtIndex(index))
    }

    return (
        <Center pt={2} position={'relative'}>
            <QuestionOutlineIcon position={'absolute'} left={4}/>
            {hintCount > 1 &&
            <HStack spacing={0}>
                {[...Array(hintCount)].map((_, i) => (
                    i === hintIndex
                        ? <Icon cursor={'pointer'} as={VscCircleFilled} onClick={() => handleHintIndicatorClick(i)}/>
                        : <Icon cursor={'pointer'} as={VscCircleOutline} onClick={() => handleHintIndicatorClick(i)}/>

                ))}
            </HStack>
            }
        </Center>
    )
}
