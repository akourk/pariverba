import {
    Button,
    FormControl,
    FormLabel,
    Textarea,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    HStack,
    useDisclosure
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase";

const AddNewStory = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [title, setTitle] = useState("");
    const [isSaving, setSaving] = useState(false);

    const handleSubmit = async () => {
        const date = new Date();

        await db.collection("stories").add({
            title,
            upVotesCount: 0,
            downVotesCount: 0,
            createdAt: date.toUTCString(),
            updatedAt: date.toUTCString(),
        });

        onClose();
        setTitle("");
    };

    return (
        <>
        <HStack>
            <Button marginRight="2" onClick={onOpen} colorScheme="blue">
                Add new story
            </Button>
        </HStack>
        

        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader>Add new story</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="story-title">
                            <FormLabel>Story Title</FormLabel>
                            <Textarea
                                type="story-title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <HStack spacing={4}>
                            <Button onClick={onClose}>Close</Button>
                            <Button
                                onClick={handleSubmit}
                                colorScheme="blue"
                                disabled={!title.trim()}
                                isLoading={isSaving}
                            >
                                Save
                            </Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
        </>
    )
}

export default AddNewStory;