import iWeb3 from 'adapter/web3';
import { SignatureTypes } from 'objects/receipt/SignatureType';
import Wallet from 'objects/Wallet';

test('Create wallet', () => {
    const web3Wallet = iWeb3.createWallet();
    const wallet = new Wallet(web3Wallet);

    expect(wallet.web3Wallet.address.length > 0);
    expect(wallet.web3Wallet.privateKey.length > 0);
});

test('Sign Wallet Generic Message', () => {
    const web3Wallet = iWeb3.createWallet();
    const wallet = new Wallet(web3Wallet);
    const testMessage = 'Some test data to sign by the wallet.';

    const signature = wallet.signMessage(testMessage);

    const resultMessage = JSON.parse(signature.message);
    expect(resultMessage.message == testMessage);
    expect(resultMessage.signatureType == SignatureTypes.NONE);
});

test('Sign Wallet As Owner', () => {
    const web3Wallet = iWeb3.createWallet();
    const ownerWeb3Wallet = iWeb3.createWallet();
    const wallet = new Wallet(web3Wallet);
    const ownerWallet = new Wallet(ownerWeb3Wallet);

    const signature = wallet.assignWalletOwner(ownerWallet.getAddress());
    
    const resultMessage = JSON.parse(signature.message);
    expect(wallet.isOwned());
    expect(resultMessage.owner == ownerWallet.getAddress());
    expect(resultMessage.signatureType == SignatureTypes.ASSIGN_OWNER);
});
