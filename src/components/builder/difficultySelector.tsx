import React from "react";
import {
    Badge,
    Box,
    FormControl,
    FormLabel,
    HStack,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack
} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {selectDifficulty} from "../../pages/builder/selectors";
import {builderActions} from "../../pages/builder/reducer";

export const DifficultySelector = () => {
    const difficulty = useSelector(selectDifficulty)
    const dispatch = useDispatch()

    const handleDifficulty = (level: number) => {
        dispatch(builderActions.setDifficulty(level))
    }

    return (
        <FormControl>
            <HStack spacing={4} alignItems={'center'}>
                <FormLabel>Difficulty</FormLabel>
                <Badge>easy</Badge>
                <Slider min={0} max={4} step={1} value={difficulty} onChange={(e) => handleDifficulty(e)} maxW={200}>
                    <SliderTrack>
                        <Box position={'relative'} right={10}/>
                        <SliderFilledTrack bg={'orange'}/>
                    </SliderTrack>
                    <SliderThumb boxSize={4}/>
                </Slider>
                <Badge>hard</Badge>
            </HStack>
        </FormControl>
    )
}
