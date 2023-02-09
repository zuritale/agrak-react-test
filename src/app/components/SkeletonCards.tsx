import React from 'react';
import { SkeletonCircle, SkeletonText, VStack } from '@chakra-ui/react';
import { UserCardColumn } from '../styles/chakra/containers';

const SkeletonCards: React.FC = () => {
  const cards: number[] = Array(3).fill(2);

  return (
    <>
      {cards.map((card: number, index: number) => (
        <VStack
          key={`skeleton-${card}-${index}`}
          sx={UserCardColumn}
          _dark={{ bg: 'gray.900' }}
        >
          <SkeletonCircle size='120px' />
          <SkeletonText mt='4' noOfLines={card} spacing='4' skeletonHeight='2' />
        </VStack>
      ))}
    </>
  );
};

export default SkeletonCards;
