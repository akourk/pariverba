import React, { useRef, useEffect, useState } from 'react';
import { withRouter, useNavigate } from 'react-router-dom';
import { Box, Stack, FormControl, Input, Button, FormErrorMessage, Text } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext"

export default function RegisterPage() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { register } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        return () => {
        };
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
    
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError("Passwords do not match")
        }
    
        try {
          setError("")
          setLoading(true)
          await register(emailRef.current.value, passwordRef.current.value)
          navigate("/")
        } catch {
          setError("Failed to create an account")
        }
    
        setLoading(false)
      }



    return (
        <Box w={300} m="auto">
            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <FormControl>
                            <Input
                                id="email-input"
                                variant="filled"
                                type="email"
                                placeholder="email"
                                size="md"
                                ref={emailRef}
                                isRequired
                            />
                    </FormControl>
                    <FormControl>
                        <Input
                            id="password-input"
                            variant="filled"
                            type="password"
                            placeholder="password"
                            size="md"
                            ref={passwordRef}
                            isRequired
                        />
                    </FormControl>
                    <FormControl isInvalid={error}>
                        <Input
                            id="confirm-password-input"
                            variant="filled"
                            type="password"
                            placeholder="confirm password"
                            size="md"
                            ref={passwordConfirmRef}
                            isRequired
                        />
                        <FormErrorMessage>{error}</FormErrorMessage>
                    </FormControl>
                    <Button type="submit" disabled={loading}>
                        Register
                    </Button>
                </Stack>
            </form>
        </Box>
    )
}

// class RegisterPage extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             email: '',
//             username: '',
//             password: '',
//             confirmPassword: '',
//             doNotMatchError: '',
//         };
//     }

//     handleSubmit = async (e) => {
//         try {
//             e.preventDefault();
//             const { email, username, password, confirmPassword } = this.state;

//             if (password !== confirmPassword) {
//                 return this.setState({ doNotMatchError: 'Passwords Do Not Match.'});
//             }
//             const date = new Date();
//             await db.collection("users").add({
//                 email,
//                 username,
//                 password,
//                 verified: false,
//                 createdAt: date.toUTCString(),
//             });
//         } catch (e) {}
//     };

//     render() {
//         const { signup } = useAuth()
//         const { email, username, password, confirmPassword, doNotMatchError } = this.state;
//         const { isLoading, error } = this.props;
//         return (
//             <Box w={300} m="auto">
//                 <form onSubmit={this.handleSubmit}>
//                     <Stack spacing={3}>
//                     <FormControl>
//                             <Input
//                                 value={email}
//                                 onChange={(e) => this.setState({ email: e.target.value })}
//                                 id="email-input"
//                                 variant="filled"
//                                 type="text"
//                                 placeholder="email"
//                                 size="md"
//                                 isRequired
//                             />
//                         </FormControl>
//                         <FormControl>
//                             <Input
//                                 value={username}
//                                 onChange={(e) => this.setState({ username: e.target.value })}
//                                 id="username-input"
//                                 variant="filled"
//                                 type="text"
//                                 placeholder="username"
//                                 size="md"
//                                 isRequired
//                             />
//                         </FormControl>
//                         <FormControl>
//                         <Input
//                                 value={password}
//                                 onChange={(e) => this.setState({ password: e.target.value })}
//                                 id="password-input"
//                                 variant="filled"
//                                 type="password"
//                                 placeholder="password"
//                                 size="md"
//                                 isRequired
//                             />
//                         </FormControl>
//                         <FormControl isInvalid={doNotMatchError}>
//                             <Input
//                                 value={confirmPassword}
//                                 onChange={(e) => this.setState({ confirmPassword: e.target.value })}
//                                 id="confirm-password-input"
//                                 variant="filled"
//                                 type="password"
//                                 placeholder="confirm password"
//                                 size="md"
//                                 isRequired
//                             />
//                             <FormErrorMessage>{doNotMatchError}</FormErrorMessage>
//                         </FormControl>
//                         <Button type="submit" isLoading={isLoading}>
//                             Register
//                         </Button>
//                         <Text>
//                             passwords are stored in plain text and db doesn't check for duplicates.
//                             don't assume anything is secure.
//                         </Text>
//                     </Stack>
//                 </form>
//             </Box>
//         )
//     }
// }

// export default RegisterPage;