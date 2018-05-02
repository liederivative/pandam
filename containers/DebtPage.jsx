import * as React from 'react';
import MenuPage from './MenuPage';
import ToolBar from '../components/Debt/ToolBar';
import Content from '../components/Debt/Content';




class CreateClientsMenu extends React.Component {

  render() {
    return (
      <MenuPage>
      	<ToolBar/>
      	<Content />
      </MenuPage>
    );
  }
}

export default CreateClientsMenu;