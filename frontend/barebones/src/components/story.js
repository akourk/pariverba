import { Box, useColorMode, HStack, Text } from "@chakra-ui/react";
import React from "react";
import VoteButtons from "./voteButtons";
import ThemedBox from "./ThemedBox";

const Story = ({ story }) => {
    const { colorMode } = useColorMode();
    const postDetailColor = 'gray.500';
    const postDetailBgColor = colorMode === 'light' ? 'gray.100' : 'gray.600';
    
    return (
        <ThemedBox
            p={4}
            borderRadius="md"
            width="100%"
            light="gray.50"
            dark="gray.700"
        >
        <HStack key={story.id} w="100%" alignItems="flex-start">
            <VoteButtons story={story} />
            {/* <Box bg="gray.100" p={4} rounded="md" w="100%"> */}
                <Text>{story.title}</Text>
            {/* </Box> */}
        </HStack>
    </ThemedBox>
        
    )
}

export default Story;