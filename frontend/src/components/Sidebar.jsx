import React, { useState } from 'react';
import { Flex, Divider, IconButton } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

function Sidebar({ backgroundColor, side, title, content }) {
const [hidden, setHidden] = useState(false);

return (
    <Flex
        boxShadow="sm"
        backgroundColor={backgroundColor}
        alignItems={hidden ? 'center' : 'baseline'}
        flexDir="column"
        gap={{ base: '3', md: '5' }}
        width={hidden ? '' : { sm: '220px', md: '300px' }}
        p={hidden ? '' : ['3', '3', '6', '6']}
        paddingRight={
        hidden
        ? ''
        : side === 'left'
        ? { sm: '7 !important', md: '10 !important' }
        : {}
        }
        h={hidden ? '' : { base: '100%', md: '95vh' }}
        rounded={hidden ? 'xl' : { base: 'none', md: '2xl' }}
        left={side === 'left' ? { base: '0vh', md: '2vh' } : ''}
        right={side === 'right' ? { base: '0vh', md: '2vh' } : ''}
        position="relative"
        float={side}
        overflowY="auto"
        overflowX="hidden"
      >
      <Flex alignItems="center">
        <IconButton
            left={hidden ? '2' : ''}
            onClick={() => setHidden(!hidden)}
            icon={<FiMenu />}
            fontSize="19"
            variant="unstyled"
            />
            {!hidden ? title : ''}
      </Flex>
      <Divider display={hidden ? 'none' : 'block'} />
      {!hidden ? content : ''}
    </Flex>
  );
}

export default Sidebar;