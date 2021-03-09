import React from 'react';

import { CustomButtonContainer } from './custom-button.styles.component';

const CustomButton = ({ children, ...props }) => (
  <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);

export default CustomButton;