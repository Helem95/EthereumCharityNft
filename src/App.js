import {useMoralis} from "react-moralis";
import {Avatar, Box, Button, Container, Flex, Heading, Spacer, Stack, Text} from "@chakra-ui/react";
import {Redirect, Route, Switch} from "react-router";
import Profile from "./components/Profile";
import {Link} from "react-router-dom";
import Admin from "./components/Admin";
import Home from "./components/Home";
import Authenticate from "./components/Authenticate";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Identicon from "identicon.js";



import { Box } from "@chakra-ui/react"


function App() {
    const {isAuthenticated, isAuthUndefined, user, logout} = useMoralis();

    return (
        <Container>
            <Flex>
                {
                    isAuthenticated && (
                        <Stack direction="row">
                            <Box>
                                <Link to="/profile">
                                    <Avatar
                                        name={user.attributes.username}
                                        src={`data:image/png;base64,${new Identicon(user.attributes.ethAddress).toString()}`}
                                    />
                                </Link>
                            </Box>
                            <Box>
                                <Button onClick={() => logout()}>Logout</Button>
                            </Box>
                            
                            
                            
                            <Box bg="tomato" w="100%" p={4} color="white">      
                                This is the Box
                           </Box>
                           
                           
                           
                        </Stack>
                    )
                }
            </Flex>
            <Heading>Create your Charity NFT</Heading>
            {
                isAuthenticated ? (
                    <Switch>
                        <Route path="/" exact>
                            <Home/>
                        </Route>
                        <Route path="/admin" exact>
                            <Admin/>
                        </Route>
                        <Route path="/profile" exact>
                            <Profile/>
                        </Route>
                    </Switch>
                ) : (
                    <Stack spacing={6}>
                        {/* isAuthUndefined is true in the first Millisecond when the Webapp starts because Moralis need some Time to authenticates the User */}
                        {!isAuthUndefined && <Redirect to="/"/>}
                        <Authenticate/>
                        <Text textAlign="center">or</Text>
                        <SignUp/>
                        <Text textAlign="center">or</Text>
                        <Login/>
                    </Stack>
                )
            }
        </Container>
    );
}

export default App;
