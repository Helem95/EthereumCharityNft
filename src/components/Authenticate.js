import {Button, Stack} from "@chakra-ui/react";
import {useMoralis} from "react-moralis";
import ErrorAlert from "./ErrorAlert";

const Authenticate = () => {
    const {authenticate, isAuthenticating, authError} = useMoralis();

    return (
        <Stack spacing={3}>
            {
                authError && (
                    <ErrorAlert errorMessage={authError.message} />
                )
            }
            <Button isLoading={isAuthenticating} onClick={() => authenticate()}>Authenticate via Metamask</Button>
        </Stack>
    );
}

export default Authenticate;