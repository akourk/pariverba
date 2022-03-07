import React from 'react';
import { withRouter } from 'react-router-dom';
import { Box, Stack, FormControl, Input, Button, FormErrorMessage, Text } from "@chakra-ui/react";
import { db } from "../lib/firebase";

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            doNotMatchError: '',
        };
    }

    handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const { email, username, password, confirmPassword } = this.state;

            if (password !== confirmPassword) {
                return this.setState({ doNotMatchError: 'Passwords Do Not Match.'});
            }
            const date = new Date();
            await db.collection("users").add({
                email,
                username,
                password,
                verified: false,
                createdAt: date.toUTCString(),
            });
        } catch (e) {}
    };

    render() {
        const { email, username, password, confirmPassword, doNotMatchError } = this.state;
        const { isLoading, error } = this.props;
        return (
            <Box w={300} m="auto">
                <form onSubmit={this.handleSubmit}>
                    <Stack spacing={3}>
                    <FormControl>
                            <Input
                                value={email}
                                onChange={(e) => this.setState({ email: e.target.value })}
                                id="email-input"
                                variant="filled"
                                type="text"
                                placeholder="email"
                                size="md"
                                isRequired
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                value={username}
                                onChange={(e) => this.setState({ username: e.target.value })}
                                id="username-input"
                                variant="filled"
                                type="text"
                                placeholder="username"
                                size="md"
                                isRequired
                            />
                        </FormControl>
                        <FormControl>
                        <Input
                                value={password}
                                onChange={(e) => this.setState({ password: e.target.value })}
                                id="password-input"
                                variant="filled"
                                type="password"
                                placeholder="password"
                                size="md"
                                isRequired
                            />
                        </FormControl>
                        <FormControl isInvalid={doNotMatchError}>
                            <Input
                                value={confirmPassword}
                                onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                                id="confirm-password-input"
                                variant="filled"
                                type="password"
                                placeholder="confirm password"
                                size="md"
                                isRequired
                            />
                            <FormErrorMessage>{doNotMatchError}</FormErrorMessage>
                        </FormControl>
                        <Button type="submit" isLoading={isLoading}>
                            Register
                        </Button>
                        <Text>
                            passwords are stored in plain text and db doesn't check for duplicates.
                            don't assume anything is secure.
                        </Text>
                    </Stack>
                </form>
            </Box>
        )
    }
}

export default RegisterPage;