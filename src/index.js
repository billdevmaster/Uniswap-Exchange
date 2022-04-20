
  import React, { useState, useEffect } from 'react';
  import { render } from 'react-dom';
  import 'carbon-components/css/carbon-components.min.css';
  import Web3 from 'web3';
  import { darkTheme, SwapWidget } from '@uniswap/widgets'
  import { Row, Col, Button } from 'antd';
  import "antd/dist/antd.css";
  import "./index.css";
  
  const {ethereum} = window;

  const theme = {
    borderRadius: 0,
    fontFamily: '"Helvetica"',
  }
  
  const App = () => {
    const [walletAddr, setWalletAddr] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const [showAddress, setShowAddress] = useState("Wallet Connect");
    const jsonRpcEndpoint = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
    let provider;
    if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
      // We are in the browser and metamask is running.
      provider = window.web3.currentProvider;
    } else {
      // We are on the server *OR* the user is not running metamask
      provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/foo',
      );
    }
    
    const web3 = new Web3(provider);

    useEffect(() => {
      connectWallet()
      async function fetchData() {
        // You can await here
        const response = await web3.eth.net.getNetworkType();
        if (response != 'ropsten'){
          setErrMsg("Please Connect Ropsten Network")
        }
      }
      fetchData();
    }, []);
    
    const connectWallet = async () => { 
      ethereum.request({method: 'eth_requestAccounts'})
      .then(async result => {
        const defaultAccounts = await web3.eth.getAccounts();
        setWalletAddr(defaultAccounts[0])
      })
      .catch((err) => {
        return;
      });
      provider.on("chainChanged", (chainId) => {
        if (parseInt(chainId, 16) !== 3) 
          setErrMsg("Please Connect Ropsten Network")
        else
          setErrMsg("")
      });
    }

    useEffect(() => {
      if (walletAddr !== '') {
        setShowAddress(walletAddr.substr(0, 4) + "..." + walletAddr.substr(walletAddr.length - 3))
      }
    }, [walletAddr]);

    return (
      <>
        <Row className='text-center'>
          <h1>Ropsten Exchange</h1>
        </Row>

        <Row className='text-center'>
          <Button type="primary" shape="round" className='btn' size='large' onClick={connectWallet}>{showAddress}</Button>
        </Row>

        <Row className='text-center'>
          <p className='text-error'>{errMsg}</p>
        </Row>

        <Row className='text-center'>
          <SwapWidget
            provider={provider}
            jsonRpcEndpoint={jsonRpcEndpoint}
            theme={darkTheme}
            width={500}
            height={1000}
          />
        </Row>
      </>
    )
  };

  render(<App />, document.getElementById('root'));
