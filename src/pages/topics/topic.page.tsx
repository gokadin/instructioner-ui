import React, {useEffect} from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Skeleton,
    Stack,
    Text,
    useColorModeValue,
    VStack
} from "@chakra-ui/react";
import {ChevronRightIcon} from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {fetchTopics} from "./reducer";
import {TopicList} from "../../components/topics/topicList";
import {selectIsTopicsLoaded, selectTopics} from "./selectors";

export const TopicPage = () => {
    const topics = useSelector(selectTopics)
    const isTopicsLoaded = useSelector(selectIsTopicsLoaded)
    const breadcrumbTextColor = useColorModeValue('gray.700', 'gray.300')
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isTopicsLoaded) {
            dispatch(fetchTopics('8bc82537-dab4-4f76-ab32-12764e586b6a'))
        }
    }, [dispatch, isTopicsLoaded])

    return (
        <VStack align={'stretch'}>
            <Breadcrumb px={4} spacing="8px" separator={<ChevronRightIcon color="gray.500"/>}>
                <BreadcrumbItem>
                    <BreadcrumbLink href="#">
                        <Text color={breadcrumbTextColor}>Mathematics</Text>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink href="#">
                        <Text color={breadcrumbTextColor}>Calculus 1</Text>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            {!isTopicsLoaded
                ? <Stack p={4}>
                    <Skeleton h={'60px'}/>
                    <Skeleton h={'60px'}/>
                    <Skeleton h={'60px'}/>
                </Stack>
                : <TopicList topics={topics}/>
            }
        </VStack>
    )
}
