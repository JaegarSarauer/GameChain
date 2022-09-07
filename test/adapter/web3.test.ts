import iWeb3 from "adapter/web3"

test('Initialize with web3', () => {
    expect(iWeb3.web3);
})

test('Create wallet', () => {
    const wallet = iWeb3.createWallet();
    expect(wallet.address.length > 0);
    expect(wallet.privateKey.length > 0);
})