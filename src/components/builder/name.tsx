import React from "react";
import {FormControl, FormLabel, Input} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {builderActions} from "../../pages/builder/reducer";
import {selectName} from "../../pages/builder/selectors";

export const Name = () => {
    const name = useSelector(selectName)
    const dispatch = useDispatch()

    const handleChange = (content: string) => {
        dispatch(builderActions.setName(content))
    }

    return (
        <FormControl>
            <FormLabel>Name</FormLabel>
            <Input placeholder={'Name'} isFullWidth={true} value={name}
                   onChange={(e) => handleChange(e.target.value)}/>
        </FormControl>
    )
}
