import React from 'react';
import Loadable from 'react-loadable';


function App() {
  const Invoice = Loadable({
    loader: () => import('./components/invoice/Index'),
    loading: () => <div><h1>Hang on!!Loading...</h1></div>,
});
  return (
    <Invoice />
  );
}

export default App;
