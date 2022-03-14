import React, { useState } from "react"
import { HStack, Button } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

const LoginRegister = () => {
    const location = useLocation();
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigate('/')
        } catch {
            setError('Failed to log out')
        }
    }

    return (
        <HStack>
            {currentUser ? 
                <>
                    <Button 
                        onClick={handleLogout}
                        as={Link}
                        to={{ 
                            // pathname: '/logout', 
                            state: {
                                prevPathname: location.pathname,
                            },
                        }}
                    >
                        Log Out
                    </Button>
                </>
                : 
                <>
                    <Button 
                        as={Link}
                        to={{ 
                            pathname: '/login', 
                            state: {
                                prevPathname: location.pathname,
                            },
                        }}
                    >
                        Login
                    </Button>
                    <Button
                        as={Link}
                        to={{ 
                            pathname: '/register', 
                            state: {
                                prevPathname: location.pathname,
                            },
                        }}
                    >
                        Register
                    </Button>
                </> }
            {/* <Button 
                onClick={handleLogout}
                as={Link}
                to={{ 
                    pathname: '/logout', 
                    state: {
                        prevPathname: location.pathname,
                    },
                }}
            >
                Log Out
            </Button> */}
            {/* <Button 
                as={Link}
                to={{ 
                    pathname: '/login', 
                    state: {
                        prevPathname: location.pathname,
                    },
                }}
            >
                Login
            </Button>
            <Button
                as={Link}
                to={{ 
                    pathname: '/register', 
                    state: {
                        prevPathname: location.pathname,
                    },
                }}
            >
                Register
            </Button> */}
        </HStack>
    );
};

export default LoginRegister