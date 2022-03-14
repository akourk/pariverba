import React, { useEffect, useRef, useState } from 'react';
import { withRouter, useNavigate } from 'react-router-dom';
import { Box, Stack, FormControl, Input, Button, FormErrorMessage } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext"

export default function LoginPage() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        return () => {
        };
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
    
        try {
          setError("")
          setLoading(true)
          await login(emailRef.current.value, passwordRef.current.value)
          navigate("/")
        } catch {
          setError("Failed to sign in")
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
                    <FormControl isInvalid={error}>
                        <Input
                            id="password-input"
                            variant="filled"
                            type="password"
                            placeholder="password"
                            size="md"
                            ref={passwordRef}
                            isRequired
                        />
                        <FormErrorMessage>{error}</FormErrorMessage>
                    </FormControl>
                    <Button type="submit" disabled={loading}>
                        Login
                    </Button>
                </Stack>
            </form>
        </Box>
    )
}


// const LoginPage = () => {

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

// class LoginPage extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             username: '',
//             password: '',
//         };
//     }

//     // handleSubmit = async (e) => {
//     //     try {
//     //         e.preventDefault();

//     //     }
//     // }

//     render() {
//         const { username, password } = this.state;
//         const { isLoading, error } = this.props;
//         return (
//             <Box w={300} m="auto">
//                 <form>
//                     <Stack spacing={3}>
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
//                         <Button type="submit" isLoading={isLoading}>
//                             Login
//                         </Button>
//                     </Stack>
//                 </form>
//             </Box>
//         )
//     }
// }

// export default LoginPage;