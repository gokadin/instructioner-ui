import React from "react";
import {Box, Center, Progress, Text, VStack} from "@chakra-ui/react";

export const ExerciseHeader = () => {
    return (
        <Box p={2}>
            <VStack>
                <Center>
                    <Text color={'gray.300'} fontSize={'lg'}>
                        0 completed - 0% correct
                    </Text>
                </Center>
                <Center>
                    <Progress w={'300px'} value={87} size="xs" colorScheme={'green'} min={0} max={100} />
                </Center>
            </VStack>
        </Box>
    )
}
