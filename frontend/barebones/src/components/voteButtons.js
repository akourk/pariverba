import { IconButton, Text, VStack } from "@chakra-ui/react";
import React, { useEfect, useEffect, useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { db } from "../lib/firebase";

const VoteButtons = ({ story }) => {
    const [isVoting, setVoting] = useState(false);
    const [votedStories, setVotedStories] = useState([]);

    useEffect(() => {
        // Fetch the previously voted items from localStorage. See https://stackoverflow.com/a/52607524/1928724 on why we need "JSON.parse" and update the item on localStorage. Return "true" if the user has already voted the post.
        const votesFromLocalStorage = localStorage.getItem("votes") || [];
        let previousVotes = [];

        try {
            // Parse the value of the item from localStorage. If the value of
            // the items aren't in the array, then JS will throw an error.
            previousVotes = JSON.parse(votesFromLocalStorage);
        } catch (error) {
            console.error(error);
        }

        setVotedStories(previousVotes);
    }, []);

    const handleDisablingOfVoting = (storyId) => {
        // This function is responsible for disabling the voting button after the
        // user has voted. Fetch the previously voted items from localStorage.
        // See https://stackoverflow.com/a/52607524/1928724 on why we need "JSON.parse"
        // and update the item in localStorage.
        const previousVotes = votedStories;
        previousVotes.push(storyId);

        setVotedStories(previousVotes);

        // Update the voted items from localStorage. See https://stackoverflow.com/a/52607524/1928724 on why we need "JSON.stringify" and update the item on localStorage.
        localStorage.setItem("votes", JSON.stringify(votedStories));
    };

    const handleClick = async (type) => {
        // Do calculation to save the vote.
        setVoting(true);
        let upVotesCount = story.upVotesCount;
        let downVotesCount = story.downVotesCount;

        const date = new Date();

        if (type === "upvote") {
            upVotesCount = upVotesCount + 1;
        } else {
            downVotesCount = downVotesCount + 1;
        }

        await db.collection("stories").doc(story.id).set({
            title: story.title,
            upVotesCount,
            downVotesCount,
            createdAt: story.createdAt,
            updatedAt: date.toUTCString()
        });

        handleDisablingOfVoting(story.id);
        setVoting(false);
    };

    const checkIfStoryIsAlreadyVoted = () => {
        if (votedStories.indexOf(story.id) > -1) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <>
        <VStack>
            <IconButton
                size="lg"
                colorScheme="purple"
                aria-label="UpVote"
                icon={<FiChevronUp />}
                onClick={() => handleClick("upvote")}
                isLoading={isVoting}
                isDisabled={checkIfStoryIsAlreadyVoted()}
            />
            <Text bg="gray.100" rounded="md" w="100%" p={1}>
                {story.upVotesCount}
            </Text>
        </VStack>
        <VStack>
            <IconButton
                size="lg"
                colorScheme="yellow"
                aria-label="DownVote"
                icon={<FiChevronDown />}
                onClick={() => handleClick("downvote")}
                isLoading={isVoting}
                isDisabled={checkIfStoryIsAlreadyVoted()}
            />
            <Text bg="gray.100" rounded="md" w="100%" p={1}>
                {story.downVotesCount}
            </Text>
        </VStack>
        </>
    );
};

export default VoteButtons;