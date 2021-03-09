import memoize from 'memoizee';
import Web3 from 'web3';
import addressGetterAbi from '../constants/abis/address_getter.json';

const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`);
const addressGetter = '0x0000000022d53366457f9d5e68ec105046fc4383';

const getRegistry = memoize(async () => {
  const contract = new web3.eth.Contract(addressGetterAbi, addressGetter);
  return contract.methods.get_registry().call();
}, {
  promise: true,
  maxAge: 10 * 60 * 1000, // 10 min
});

export {
  getRegistry,
};
