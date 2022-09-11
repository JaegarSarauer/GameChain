
export type InjectedWindow = Window & typeof globalThis & {
    ethereum?: any
    web3?: any
};

const getWindow = (() => {
    return window as InjectedWindow;
})()

export default getWindow;