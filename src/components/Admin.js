import {useMoralis} from "react-moralis";
import {Stack, Text, Alert, AlertIcon} from "@chakra-ui/react";
import {Redirect} from "react-router";
import Authenticate from "./Authenticate";
import SignUp from "./SignUp";
import Login from "./Login";
import {Link} from "react-router-dom";
import Dashboard from "./Dashboard";

const Admin = () => {
    const {isAuthenticated, user, isAuthUndefined, logout} = useMoralis();

    return (
        isAuthenticated ? (
            <Stack spacing={6}>

                {
                    (user.attributes.role === "admin") && (
                        <Dashboard/>
                    )
                }
                {
                    (user.attributes.role === "user") && (
                        <Alert status="info">
                            <AlertIcon />
                            <Text>Only Admin can access the Dashboard</Text>
                            <Link to="/">Back to NFT Creation</Link>
                        </Alert>
                    )
                }
            </Stack>
        ) : (
            <Stack spacing={6}>
                {/* isAuthUndefined is true in the first Millisecond when the Webapp starts because Moralis need some Time to authenticates the User */}
                {!isAuthUndefined && <Redirect to="/admin"/>}
                <Authenticate/>
                <Text textAlign="center">or</Text>
                <SignUp/>
                <Text textAlign="center">or</Text>
                <Login/>
            </Stack>
        )
    );
}
export default Admin;