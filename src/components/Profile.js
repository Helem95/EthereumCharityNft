import {Box, Input, Text, Stack, Button} from "@chakra-ui/react";
import {useState} from "react";
import {useMoralis} from "react-moralis";
import ErrorAlert from "./ErrorAlert";

const Profile = () => {
    const {user, setUserData, userError, isUserUpdating} = useMoralis();
    const [username, setUsername] = useState(user.attributes.username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.attributes.email);

    const handleSaveChanges = () => {
        setUserData({
            username: username,
            /* The Function setUserData() will skip undefined Values - so the old Value will be not changed */
            password: password === "" ? undefined : password,
            email: email
        });
    }

    return (
        <Stack spacing={3}>
            {
                userError && (
                    <ErrorAlert errorMessage={userError.message} />
                )
            }
            <Box>
                <Text>Username</Text>
                <Input value={username} onChange={(event) => setUsername(event.currentTarget.value)}/>
            </Box>
            <Box>
                <Text>Password</Text>
                <Input value={password} onChange={(event) => setPassword(event.currentTarget.value)}/>
            </Box>
            <Box>
                <Text>Email</Text>
                <Input value={email} onChange={(event) => setEmail(event.currentTarget.value)}/>
            </Box>

            <Button onClick={handleSaveChanges} isLoading={isUserUpdating}>Save Changes</Button>

        </Stack>
    );
}

export default Profile;