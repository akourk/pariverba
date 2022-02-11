import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";
import VoteButtons from "./voteButtons";

const Story = ({ story }) => {
    return (
        <HStack key={story.id} w="100%" alignItems="flex-start">
            <VoteButtons story={story} />
            <Box bg="gray.100" p={4} rounded="md" w="100%">
                <Text>{story.title}</Text>
            </Box>
        </HStack>
    )
}

export default Story;