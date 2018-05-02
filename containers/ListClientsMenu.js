import * as React from 'react';
import MenuPage from './MenuPage';
import ListClientsBar from '../components/Clients/List/ToolBar';
import ListClientsContent from '../components/Clients/List/Content';




class CreateClientsMenu extends React.Component {

  render() {
    return (
      <MenuPage>
      	<ListClientsBar/>
      	<ListClientsContent />
      </MenuPage>
    );
  }
}

export default CreateClientsMenu;