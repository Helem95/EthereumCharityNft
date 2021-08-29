import {useState} from "react";
import {useMoralis} from "react-moralis";
import {Stack, Button, Input} from "@chakra-ui/react";

const SignUp = () => {
    const {signup} = useMoralis();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Stack spacing={3}>
            <Input
                placeholder="Email"
                type="text"
                value={email}
                onChange={event => setEmail(event.currentTarget.value)}
            />
            <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={event => setPassword(event.currentTarget.value)}
            />
            {/* signup(username, password, email) */}
            <Button onClick={() => signup(email, password, email)}>Sign up</Button>
        </Stack>
    );
}
export default SignUp;