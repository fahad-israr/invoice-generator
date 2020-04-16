import React from 'react';
import Loadable from 'react-loadable';
import { css } from '@emotion/core';
import { ScaleLoader } from 'react-spinners';
const override = css`
display:inline;
margin-top: 0 auto;
border-color: red;
`;
function App() {
  const loading=(<div className='sweet-loading'>
   <ScaleLoader css={override}   sizeUnit={"px"}  color={'#0099cc'} size={80} height={35} width={12}  radius={2} loading={true}/>
  <div style={{fontSize:"30px"}}>Loading...</div>
  </div>)
  const Invoice = Loadable({
    loader: () => import('./components/invoice/Index'),
    loading: () =>loading ,
});
  return (
    <Invoice />
  );
}

export default App;
