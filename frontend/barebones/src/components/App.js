import React from 'react'
// import VoteValue from './VoteValue';
// import VoteValueContextProvider from '../context/VoteValueContext';
// import '../App.css';
import { ChakraProvider, Container, Flex, Spinner, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import theme from "../theme";
import Story from "./story";
import { db } from "../lib/firebase";
import Navbar from "./navbar";
import ThemedBox from './ThemedBox';

const App = () => {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        // Hook to handle the real-time updating of posts whenever there is a
        // change in the datastore (https://firebase.google.com/docs/firestore/query-data/listen#view_changes_between_snapshots)

        db.collection("stories")
            .orderBy("createdAt", "desc")
            .onSnapshot((querySnapshot) => {
                const _stories = [];

                querySnapshot.forEach((doc) => {
                    _stories.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });

                setStories(_stories);
            });
        // // Hook to handle the initial fetching of stories

        // db.collection("stories")
        // .orderBy("createdAt", "desc")
        // .get()
        // .then((querySnapshot) => {
        //     const data = querySnapshot.docs.map((doc) => ({
        //         id: doc.id,
        //         ...doc.data(),
        //     }));

        //     setStories(data);
        // });
    }, []);

    return (
        <>
        <ChakraProvider theme={theme}>
            <ThemedBox minHeight="100vh" light="gray.300" dark="gray.800">
                <Navbar />
                {/* <Container maxW="md" centerContent p={8}> */}
                <Container centerContent p={2}>
                    <VStack spacing={2} w="100%">
                        {stories.map((story) => (
                            <Story story={story} key={story.id} />
                        ))}
                    </VStack>
                </Container>
            </ThemedBox>
        </ChakraProvider>
        </>
        // <VoteValueContextProvider>
        //     <div>
        //         <div>
        //             <VoteValue />
        //         </div>
        //     </div>
        // </VoteValueContextProvider>
    );
};

export default App