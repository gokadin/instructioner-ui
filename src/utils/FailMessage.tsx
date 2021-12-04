import React from "react";
import {Center, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {IoSadSharp} from "react-icons/all";

interface Props {
    message: string;
}

export const FailMessage = ({message}: Props) => {
    const backgroundColor = useColorModeValue('gray.100', 'gray.900')
    const topTextColor = useColorModeValue('gray.600', 'gray.400')
    const bottomTextColor = useColorModeValue('gray.900', 'gray.300')

    return (
        <Center bg={backgroundColor} p={5} m={'20px !important'} borderRadius={10}>
            <VStack>
                <Icon fontSize={30} color={'orange.400'} as={IoSadSharp}/>
                <Text pt={4} color={topTextColor} fontSize={18}>
                    Something went wrong...
                </Text>
                <Text py={0} color={bottomTextColor} fontSize={18}>
                    {message}
                </Text>
            </VStack>
        </Center>
    );
}
