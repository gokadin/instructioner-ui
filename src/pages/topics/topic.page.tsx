import React, {useEffect} from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Text,
    VStack
} from "@chakra-ui/react";
import {ChevronRightIcon} from "@chakra-ui/icons";
import {useDispatch} from "react-redux";
import {fetchTopics} from "./reducer";
import {TopicList} from "../../components/topics/topicList";

export const TopicPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTopics())
    }, [dispatch])

    return (
        <VStack align={'stretch'}>
            <Breadcrumb px={4} spacing="8px" separator={<ChevronRightIcon color="gray.500"/>}>
                <BreadcrumbItem>
                    <BreadcrumbLink href="#">
                        <Text color={'gray.300'}>Mathematics</Text>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink href="#">
                        <Text color={'gray.300'}>Calculus 1</Text>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <TopicList/>
        </VStack>
    )
}
