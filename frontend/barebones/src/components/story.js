import { Box, useColorMode, HStack, VStack, Text, Flex } from "@chakra-ui/react";
import React from "react";
import VoteButtons from "./voteButtons";
import ThemedBox from "./ThemedBox";
import { ChatIcon } from '@chakra-ui/icons';
import { Link, useLocation} from "react-router-dom";

const Story = ({ story }) => {
    const location = useLocation();
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
                
                <VStack>
                    <VoteButtons story={story} />
                    
                    <Flex
                    mt={3}
                    alightItems="left"
                    fontWeight="bold"
                    >
                        <Box
                            as={Link}
                            to={{ 
                                pathname: '/', 
                                state: {
                                    prevPathname: location.pathname,
                                },
                            }}
                            p={2}
                            borderRadius="sm"
                            _hover={{ backgroundColor: postDetailBgColor}}
                        >
                            <ChatIcon mr={2} />
                            comments

                        </Box>
                    </Flex>
                </VStack>
                <Text>{story.title}</Text>
                {/* <Box bg="gray.100" p={4} rounded="md" w="100%"> */}
                
                {/* </Box> */}
                
                
            </HStack>
        </ThemedBox>
        
    )
}

export default Story;