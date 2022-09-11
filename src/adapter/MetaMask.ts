import Web3 from 'web3'; 
import getWindow from './window';

export default class MetaMask {
    currentAccount: string | undefined;
    web3: Web3 | undefined;

    async init(): Promise<boolean> {
        if (getWindow.ethereum) {
            this.currentAccount = await getWindow.ethereum.request({ method: 'eth_requestAccounts' });
            this.web3 = new Web3(getWindow.ethereum);
            this._initAccountMonitor();
            return true;
        }
        return false;
    }

    _initAccountMonitor() {
        getWindow.ethereum.on('accountsChanged',  (accounts: any[]) => {
            this.currentAccount = accounts[0];
        });
    }
}
