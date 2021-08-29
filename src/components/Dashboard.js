import {Alert, AlertIcon, Box, Button, Input, Stack, Text} from "@chakra-ui/react";
import {useState} from "react";
import CharityNft from "../abis/CharityNft.json";
import  loadWeb3 from "./loadWeb3";

const Dashboard = () => {
    const [isLoading, setLoading] = useState(false);
    const [account, setAccount] = useState("");
    const {isValidAddress, setValidAddress} = useState(true);
    const [charityAddress, setCharityAddress] = useState("");
    const [charityDescription, setCharityDescription] = useState("");

    const setNewCharityGoal = async () => {
        loadWeb3();
        const web3 = window.web3;
        /* Load all Accounts from Wallet */
        const accounts = await web3.eth.getAccounts();
        /* Adding first Account to the State */
        setAccount(accounts[0]);
        /* Getting the connected Network from the Wallet */
        const networkId = await web3.eth.net.getId();
        /* Getting the Network Data from the ABI */
        const networkData = CharityNft.networks[networkId];
        /* Checking if Network exists */
        if (networkData) {
            setLoading(true);
            /* JavaScript Version of the Smart Contract */
            const charityNft = new web3.eth.Contract(CharityNft.abi, CharityNft.networks[networkId].address);
            if(web3.utils.isAddress(charityAddress)) {
                await charityNft.methods.setCharityAddress(charityAddress).send({
                    from: accounts[0]
                });
            } else {
                setValidAddress(false);
            }
            setLoading(false);
        } else {
            window.alert("Smart Contract Charity Token is not deployed to detected Network");
        }
    }

    return (
        <Stack spacing={3}>
            <Box>
                <Text>Charity Description</Text>
                <Input
                    type="textarea"
                    value={charityDescription}
                    isRequired={true}
                    onChange={(event) => {
                        setCharityDescription(event.currentTarget.value)
                    }}
                />
            </Box>
            {
                (!isValidAddress) && (
                    <Alert status="warning">
                        <AlertIcon />
                        <Text>Address is not valid</Text>
                    </Alert>
                )
            }
            <Box>
                <Text>Charity Address</Text>
                <Input isRequired={true} value={charityAddress} onChange={(event) => setCharityAddress(event.currentTarget.value)}/>
            </Box>
            <Button onClick={setNewCharityGoal} isLoading={isLoading}>Set new Charity Goal</Button>
        </Stack>
    );
}

export default Dashboard;