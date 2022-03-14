import { Button, Heading, Box, Spacer, Flex, Menu, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import React from "react";
import AddNewStory from "./addNewStory";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import ThemedBox from "./ThemedBox";
import LoginRegister from "./LoginRegister";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
    const location = useLocation();
    const { currentUser } = useAuth()

    return (
        <ThemedBox
            py={2}
            px={[0, 0, 10, 10]}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            mb={7}
        >
            {/* <Container maxW="md" centerContent> */}

                
                <Flex w="100%" position="sticky" top={0} alignItems={'center'}>
                    <Menu>
                        <Heading 
                            ml={[2, 4]} 
                            fontSize={['1.3rem', '2.25rem']}
                            as={Link}
                            to={{ 
                                pathname: '/', 
                                state: {
                                    prevPathname: location.pathname,
                                },
                            }}>
                        pariverbis
                        </Heading>
                        <Spacer />
                        {currentUser ? 
                        <>
                            <Box> {JSON.stringify(currentUser.email)} </Box> 
                            <AddNewStory />
                        </>
                        : <></> }
                        {/* <Box currentUser='null'> {JSON.stringify(currentUser.email)} </Box> */}
                        {/* <Box> {JSON.stringify(currentUser.email)} </Box> */}
                         {/* <AddNewStory /> */}
                        <LoginRegister />
                        <ColorModeSwitcher />
                    </Menu>
                    
                </Flex>

                
            {/* </Container> */}
        </ThemedBox>
    );
};

export default Navbar;