import React from "react";
import {Button, ButtonGroup, FormControl, FormLabel, HStack} from "@chakra-ui/react";
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
            <FormLabel>Difficulty</FormLabel>
            <ButtonGroup size={'sm'} colorScheme={'teal'}>
                <HStack>
                    <Button variant={(!difficulty || difficulty === 0) ? 'solid' : 'outline'}
                            onClick={() => handleDifficulty(0)}>easy</Button>
                    <Button variant={difficulty === 1 ? 'solid' : 'outline'}
                            onClick={() => handleDifficulty(1)}>medium</Button>
                    <Button variant={difficulty === 2 ? 'solid' : 'outline'}
                            onClick={() => handleDifficulty(2)}>hard</Button>
                </HStack>
            </ButtonGroup>
        </FormControl>
    )
}
