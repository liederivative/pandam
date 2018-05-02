import * as React from 'react';
import MenuPage from './MenuPage';
import CreateClientsBar from '../components/Clients/Create/ToolBar';

import StepperCreateClients from '../components/Clients/Create/Stepper';



class CreateClientsMenu extends React.Component {

  render() {
    return (
      <MenuPage>
      	<CreateClientsBar/>
      	<StepperCreateClients />
      </MenuPage>
    );
  }
}

export default CreateClientsMenu;