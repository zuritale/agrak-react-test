import React from 'react';
import { Box } from '@chakra-ui/react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import { routes } from './consts/routes';
import AddUser from './views/AddUser';
import Home from './views/Home';
import './App.css';

function App (): JSX.Element {
  return (
    <Box minH='100vh' >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path={routes.home}
            element={<Home />}
            />
          <Route
            path={routes.userInRouting}
            element={<AddUser />}
            />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
