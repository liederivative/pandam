import * as React from 'react';
import MenuPage from './MenuPage';
import ToolBar from '../components/Users/ToolBar';
import Content from '../components/Users/Content';




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