import {useState} from "react";
import {useMoralis} from "react-moralis";
import {Stack, Button, Input} from "@chakra-ui/react";

const Login = () => {
    const {login} = useMoralis();
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
            {/* login(username, password) */}
            <Button onClick={() => login(email, password)}>Login</Button>
        </Stack>
    );
}
export default Login;