import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { NavLink, withRouter } from 'react-router-dom';

import ListIcon from '@material-ui/icons/FilterList';
import FilterIcon from '@material-ui/icons/Search';

import RoundButton from '~/components/RoundButton';

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-grow: 0;
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 1000;
`;

const MenuItem = styled(NavLink)`
  margin-bottom: 10px;
`;

class Menu extends PureComponent {
  render() {
    return (
      <MenuWrapper>
        <MenuItem exact to="/filter">
          <RoundButton>
            <FilterIcon />
          </RoundButton>
        </MenuItem>
        <MenuItem exact to="/list">
          <RoundButton>
            <ListIcon />
          </RoundButton>
        </MenuItem>
      </MenuWrapper>
    );
  }
}

export default withRouter(Menu);
