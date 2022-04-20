
  import React from 'react';
  import { render } from 'react-dom';
  import Web3 from 'web3';
  import { SwapWidget } from '@uniswap/widgets'
  // import 'carbon-components/css/carbon-components.min.css';

  const App = () => (
    <div className="Uniswap">
      <SwapWidget
        provider={provider}
        jsonRpcEndpoint={jsonRpcEndpoint}
      />
    </div>
  );

  render(<App />, document.getElementById('root'));
