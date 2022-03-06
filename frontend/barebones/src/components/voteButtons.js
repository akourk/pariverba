import { IconButton, Flex, Text } from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";

const VoteButtons = ({ story }) => {
    const size = 6;
    const upVoteColor = 'blue.500';
    const downVoteColor = 'orange.500';
    const [isVoting, setVoting] = useState(false);
    const [votedStories, setVotedStories] = useState([]);
    const upVoteIcon = (
        <TriangleUpIcon
            w={size}
            h={size}
            _hover={{ color: upVoteColor }}
        />
    )
    const downVoteIcon = (
        <TriangleDownIcon
            w={size}
            h={size}
            _hover={{ color: downVoteColor }}
        />
    )
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

        calculateKarma();
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

    const calculateKarma = () => {
        return story.upVotesCount - story.downVotesCount;
    }

    const determineKarmaColor = () => {
        if (calculateKarma() < 0) {
            return downVoteColor;
        } else {
            return upVoteColor;
        }
    }

    return (
        <>
        <Flex direction="column" alignItems="center" mr={3}>
            <IconButton
                role="group"
                onClick={() => handleClick("upvote")}
                isLoading={isVoting}
                isDisabled={checkIfStoryIsAlreadyVoted()}
                backgroundColor="inherit"
                // color={VoteValue === 1 ? upvoteColor : null}
                color={votedStories.indexOf(story.id) === 1 ? upVoteColor : null}
                boxShadow="none !important"
                icon={upVoteIcon}
                />
            <Text fontSize={3.5 * size} color={determineKarmaColor()}>
                    {calculateKarma()}
            </Text>
            <IconButton
                role="group"
                onClick={() => handleClick("downvote")}
                isLoading={isVoting}
                isDisabled={checkIfStoryIsAlreadyVoted()}
                backgroundColor="inherit"
                // color={VoteValue === 1 ? upvoteColor : null}
                color={votedStories.indexOf(story.id) === -1 ? downVoteColor : null}
                boxShadow="none !important"
                icon={downVoteIcon}
            />
        </Flex>
        </>
        // <>
        // <VStack>
        //     <IconButton
        //         size="lg"
        //         colorScheme="purple"
        //         aria-label="UpVote"
        //         icon={<FiChevronUp />}
        //         onClick={() => handleClick("upvote")}
        //         isLoading={isVoting}
        //         isDisabled={checkIfStoryIsAlreadyVoted()}
        //     />
        //     <Text bg="gray.20" rounded="md" w="100%" p={1}>
        //         {story.upVotesCount}
        //     </Text>
        // </VStack>
        // <VStack>
        //     <IconButton
        //         size="lg"
        //         colorScheme="yellow"
        //         aria-label="DownVote"
        //         icon={<FiChevronDown />}
        //         onClick={() => handleClick("downvote")}
        //         isLoading={isVoting}
        //         isDisabled={checkIfStoryIsAlreadyVoted()}
        //     />
        //     <Text bg="gray.20" rounded="md" w="100%" p={1}>
        //         {story.downVotesCount}
        //     </Text>
        // </VStack>
        // </>
    );
};

export default VoteButtons;