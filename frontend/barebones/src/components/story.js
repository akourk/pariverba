import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";

const Story = ({ story }) => {
    return (
        <HStack key={story.id} w="100%" alignItems="flex-start">
            <Box bg="gray.100" p={4} rounded="md" w="100%">
                <Text>{story.title}</Text>
            </Box>
        </HStack>
    )
}

export default Story;