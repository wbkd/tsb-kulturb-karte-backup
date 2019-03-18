import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Route, withRouter, Switch } from 'react-router-dom';

import SidebarFilter from './SidebarFilter';
import SidebarAnalysis from './SidebarAnalysis';
import SidebarList from './SidebarList';
import SidebarClose from './SidebarClose';

const SidebarWrapper = styled.div`
  display: block;
  background: #fefefe;
  display: flex;
  box-shadow: ${props => (props.isVisible ? props.theme.boxShadow : 'none')};
  z-index: 1000;
  position: absolute;
  height: 100vh;
  transform: ${props => (props.isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)')};
  transition: transform .5s, box-shadow .5s;
  overflow: auto;
`;

const SidebarContent = styled.div`
  min-width: 370px;
  max-width: 370px;
  padding: 20px 15px;
`;

class Sidebar extends PureComponent {
  render() {
    return (
      <Route
        path={['/analysis', '/list', '/filter']}
        children={({ match }) => (
          <SidebarWrapper isVisible={match}>
            <SidebarClose />
            <SidebarContent>
              <Switch>
                <Route path="/filter" component={SidebarFilter} />
                <Route path="/analysis" component={SidebarAnalysis} />
                <Route path="/list" component={SidebarList} />
              </Switch>
            </SidebarContent>
          </SidebarWrapper>
        )}
      />
    );
  }
}

export default withRouter(Sidebar);
