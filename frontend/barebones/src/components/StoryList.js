import React from 'react';
import { Box, Heading, Container, VStack } from "@chakra-ui/react";
import Story from "./story";
import { db } from "../lib/firebase";
import { useEffect, useState } from "react";
import ThemedBox from './ThemedBox';

const StoryList = () => {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        // Hook to handle the real-time updating of posts whenever there is a
        // change in the datastore (https://firebase.google.com/docs/firestore/query-data/listen#view_changes_between_snapshots)

        db.collection("stories")
            .orderBy("voteSum", "desc")
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
        <Box>
            <Heading>Home</Heading>
            <Container centerContent p={2}>
                <VStack spacing={2} w="100%">
                    {stories.map((story) => (
                        <Story story={story} key={story.id} />
                    ))}
                </VStack>
            </Container>
        </Box>
    )
}

export default StoryList;