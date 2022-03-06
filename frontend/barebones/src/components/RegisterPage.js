import React from 'react';
import { withRouter } from 'react-router-dom';
import { Box, Stack, FormControl, Input, Button, FormErrorMessage } from "@chakra-ui/react";





// const RegisterPage = () => {

//     return (
//         <Box w={300} m="auto">
//             <form>
//                 <Stack spacing={3}>
//                     <Input
//                         value={username}

//                     />
//                 </Stack>
//             </form>
//         </Box>
//     )
// }

// export default RegisterPage;

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            doNotMatchError: '',
        };
    }

    // handleSubmit = async (e) => {
    //     try {
    //         e.preventDefault();

    //     }
    // }

    render() {
        const { username, password, confirmPassword, doNotMatchError } = this.state;
        const { isLoading, error } = this.props;
        return (
            <Box w={300} m="auto">
                <form>
                    <Stack spacing={3}>
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
                    </Stack>
                </form>
            </Box>
        )
    }
}

export default RegisterPage;