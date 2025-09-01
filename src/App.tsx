import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyles } from '@/styles/GlobalStyles';
import RoutesIndex from '@/routes';

const App: React.FC = () => {
   return (
      <BrowserRouter>
         <GlobalStyles />

         <RoutesIndex />
      </BrowserRouter>
   );
};

export default App;
