import {Alert, AlertIcon, Box, Button, Divider, Image, Input, Stack, Text} from "@chakra-ui/react";
import {useState} from "react";
import {useMoralis, useMoralisFile} from "react-moralis";
import CharityNft from "../abis/CharityNft.json";
import loadWeb3 from "./loadWeb3";

const Home = () => {
    const {setUserData} = useMoralis();
    const {isUploading, saveFile} = useMoralisFile();
    const [isLoading, setLoading] = useState(false);
    const [image, setImage] = useState([]);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [account, setAccount] = useState("");
    const [ipfsImage, setIpfsImage] = useState("");
    const [ipfsMetadata, setIpfsMetadata] = useState("");
    const [nftId, setNftId] = useState(0);

    const uploadImage = async () => {
        if (title && image) {
            const fileIpfs = await saveFile(title, image, {
                saveIPFS: true
            });
            if (fileIpfs) {
                await setUserData({
                    /* The Function setUserData() will skip undefined Values - so the old Value will be not changed */
                    fileIpfs: fileIpfs,
                });
                setIpfsImage(fileIpfs._ipfs);
            }
        }
    }

    const uploadMetadata = async () => {
        if (title && author && description) {
            const metadata = {
                "name": title,
                "description": description,
                "image": ipfsImage
            }
            const metadataIpfs = await saveFile("metadata.json", {base64: btoa(JSON.stringify(metadata))}, {
                saveIPFS: true
            });
            if (metadataIpfs) {
                await setUserData({
                /* The Function setUserData() will skip undefined Values - so the old Value will be not changed */
                    metadataIpfs: metadataIpfs,
                });
                setIpfsMetadata(metadataIpfs._ipfs);
            }
        }
    }

    const mintNft = async () => {
        setLoading(true);
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
        // Contract Address
        // 0x75220b2c982cbabcc66a6b7b96ae0d9593b18f23
        /* Checking if Network exists */
        if (networkData) {
            /* JavaScript Version of the Smart Contract */
            const charityNft = new web3.eth.Contract(CharityNft.abi, CharityNft.networks[networkId].address);
            const nftId = await charityNft.methods.mintToken(ipfsMetadata).send({
                from: accounts[0]
            });
            setNftId(nftId);
        } else {
            window.alert("Smart Contract Charity Token is not deployed to detected Network");
        }
        setLoading(false);
    }

    return (
        <Stack spacing={3}>
            {
                (!title || !image) && (
                    <Alert status="info">
                        <AlertIcon/>
                        <Text>Please choose an Image and a Title</Text>
                    </Alert>
                )
            }
            {
                (nftId) && (
                    <Alert status="info">
                        <AlertIcon/>
                        <Text>NFT was created: </Text>
                        <Text><a href={ipfsMetadata}>NFT Metadata</a></Text>
                    </Alert>
                )
            }
            {
                (image.length) && (
                    <Box>
                        <Image src={URL.createObjectURL(image)} alt={title}/>
                    </Box>
                )
            }
            <Box>
                <Text>Image</Text>
                <Input
                    type="file"
                    accept="image/*"
                    multiple={false}
                    isDisabled={ipfsImage}
                    onChange={(event) => {
                        setImage(event.target.files[0])
                    }}
                />
            </Box>
            <Box>
                <Text>Image Title</Text>
                <Input
                    isRequired={true}
                    value={title}
                    isDisabled={ipfsImage}
                    onChange={(event) => {
                        setTitle(event.currentTarget.value)
                    }}/>
            </Box>
            <Button
                onClick={uploadImage}
                isDisabled={ipfsImage}
                isLoading={isUploading}
                loadingText="Uploading Image">
                1) Upload Image to IPFS
            </Button>
            <Divider/>
            <Box>
                <Text>Image Author</Text>
                <Input
                    isRequired={true}
                    value={author}
                    isDisabled={isLoading || !ipfsImage || ipfsMetadata}
                    onChange={(event) => {
                        setAuthor(event.currentTarget.value)
                    }}/>
            </Box>
            <Box>
                <Text>Image Description</Text>
                <Input
                    isRequired={true}
                    type="textarea"
                    value={description}
                    isDisabled={isLoading || !ipfsImage || ipfsMetadata}
                    onChange={(event) => {
                        setDescription(event.currentTarget.value)}
                    }/>
            </Box>
            <Button
                onClick={uploadMetadata}
                isDisabled={isLoading || !ipfsImage || ipfsMetadata}
                isLoading={isUploading}
                loadingText="Uploading Metadata">
                2) Upload Metadata
            </Button>
            <Divider/>
            <Button
                onClick={mintNft}
                isDisabled={isLoading || !ipfsImage || !ipfsMetadata}
                isLoading={isLoading}
                loadingText="Creating NFT">
                3) Mint NFT
            </Button>
        </Stack>
    );
}

export default Home;