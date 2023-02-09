import React from 'react';
import { Flex, HStack, IconButton, useColorMode } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMoon, FiSun } from 'react-icons/fi';

import { navbarContainer } from '../styles/chakra/containers';
import { routes } from '../consts/routes';

const Navbar: React.FC = () => {
  const location = useLocation();

  const { colorMode, toggleColorMode } = useColorMode();

  const navigate = useNavigate();

  const goHome: () => void = () => {
    navigate(routes.home);
  };

  return (
    <Flex
      sx={navbarContainer}
    >
      {location.pathname !== '/' && (
        <HStack>
          <IconButton
            onClick={goHome}
            aria-label="Back"
            icon={<FiArrowLeft />}
            isRound
          />
        </HStack>
      )}
      <HStack ml="auto" >
        <IconButton
          icon={colorMode === 'light' ? <FiSun /> : <FiMoon />}
          isRound
          onClick={toggleColorMode}
          aria-label='toogle-dark-mode'
        />
      </HStack>
    </Flex>
  );
};

export default Navbar;
