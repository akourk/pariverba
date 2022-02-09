import React from 'react'
// import VoteValue from './VoteValue';
// import VoteValueContextProvider from '../context/VoteValueContext';
// import '../App.css';
import { Container, Flex, Spinner, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Story from "./story";
import { db } from "../lib/firebase";

const App = () => {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        // Hook to handle the initial fetching of stories

        db.collection("stories")
        .orderBy("createdAt", "desc")
        .get()
        .then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setStories(data);
        });
    }, []);

    return (
        <>
        <Container maxW="md" centerContent p={8}>
            <VStack spacing={8} w="100%">
                {stories.map((story) => (
                    <Story story={story} key={story.id} />
                ))}
            </VStack>
        </Container>
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