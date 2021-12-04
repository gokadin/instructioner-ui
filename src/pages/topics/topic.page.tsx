import React, {useEffect} from "react";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import {ChevronRightIcon} from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {fetchTopics} from "./reducer";
import {TopicList} from "../../components/topics/topicList";
import {selectTopics, selectTopicsLoadState} from "./selectors";

export const TopicPage = () => {
    const topics = useSelector(selectTopics)
    const topicsLoadState = useSelector(selectTopicsLoadState)
    const breadcrumbTextColor = useColorModeValue('gray.700', 'gray.300')
    const dispatch = useDispatch()

    useEffect(() => {
        if (topicsLoadState.shouldLoad()) {
            console.log('loading topics')
            dispatch(fetchTopics('8bc82537-dab4-4f76-ab32-12764e586b6a'))
        }
    }, [dispatch, topicsLoadState])

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
            <TopicList topics={topics} loadState={topicsLoadState}/>
        </VStack>
    )
}
