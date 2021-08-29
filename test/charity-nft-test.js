const CharityNft = artifacts.require("CharityNft");

contract("CharityNft", ([deployer, charityReceiver]) => {
    beforeEach(async () => {
        // constructor(address payable _charityAddress)
        charityNft = await CharityNft.new(charityReceiver);
    });
    describe("Testing Token Contract", () => {
        it("Checking NFT Name", async () => {
            expect(await charityNft.name()).to.be.eq("CharityNFT");
        });
        it("Checking NFT Symbol", async () => {
            expect(await charityNft.symbol()).to.be.eq("CHARITY");
        });
        it("Checking NFT Owner", async () => {
            expect(await charityNft.owner()).to.be.eq(deployer);
        });
        it("Checking NFT Charity Address", async () => {
            expect(await charityNft.charityAddress()).to.be.eq(charityReceiver);
        });
        it("Checking NFT Mint", async () => {
            let newItemId = await charityNft.mintToken("tokenURI", {
                from: deployer,
                value: web3.utils.toWei("0.01", "Ether")
            });
            newItemId = newItemId.logs[0].args.tokenId.toString();
            expect(newItemId).to.be.eq("1");
        });
        it("Checking withdraw Charity", async () => {
            const charityBalance = await web3.eth.getBalance(charityReceiver);
            await charityNft.mintToken("tokenURI", {
                from: deployer,
                value: web3.utils.toWei("0.01", "Ether")
            });
            await charityNft.withdrawCharity({
                from: deployer
            });
            expect(Number(await web3.eth.getBalance(charityReceiver))).to.be.above(Number(charityBalance));
        });
        it("Checking NFT Fallback", async () => {
            const charityBalance = await web3.eth.getBalance(charityReceiver);
            await charityNft.sendTransaction({
                from: deployer,
                value: web3.utils.toWei("0.42", "Ether")
            });
            expect(Number(await web3.eth.getBalance(charityReceiver))).to.be.above(Number(charityBalance));
        });
    });
});