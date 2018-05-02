import * as React from 'react';
import MenuPage from './MenuPage';
import ToolBarExample from '../components/ToolBarExample';
import MenuItems from '../components/MenuItems';
import EditMenu from '../components/EditMenu';

class ExampleMenu extends React.Component {

  render() {
    return (
      <MenuPage>
      	<ToolBarExample/>
      	<EditMenu/>
      </MenuPage>
    );
  }
}

export default ExampleMenu;