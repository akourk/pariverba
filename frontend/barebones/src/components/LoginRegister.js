import { HStack, Button } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const LoginRegister = () => {
    const location = useLocation();
    return (
        <HStack>
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
        </HStack>
    );
};

export default LoginRegister