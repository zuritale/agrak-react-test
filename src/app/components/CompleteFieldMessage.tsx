import React from 'react';
import { FormHelperText } from '@chakra-ui/react';

import { messages } from '../consts/messages';

const CompleteFieldMessage: React.FC = () => (
  <FormHelperText>{messages.COMPLETE_FIELD}</FormHelperText>
);

export default CompleteFieldMessage;
