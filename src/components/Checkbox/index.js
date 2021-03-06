import React from 'react';
import styled from 'styled-components';

const CheckboxWrapper = styled.div``;

const Label = styled.label`
  user-select: none;
  cursor: pointer;
  font-family: ${props => props.theme.fonts.sans};
  font-weight: 400;
`;

const Checkbox = styled.input.attrs({
  type: 'checkbox'
})`
  margin-right: ${props => props.theme.margin[0]};
  cursor: pointer;
`;

export default props => (
  <CheckboxWrapper>
    <Label>
      <Checkbox {...props} />
      {props.label}
    </Label>
  </CheckboxWrapper>
);
