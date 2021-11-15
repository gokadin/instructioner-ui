import React from "react";
import {Center, Spinner} from "@chakra-ui/react";

export const LoadingUser = () => {
    return (
        <Center h={'full'}>
            <Spinner size="xl"/>
        </Center>
    )
}
