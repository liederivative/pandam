import * as React from 'react';
import MenuPage from './MenuPage';

import SearchClientsBar from '../components/Clients/Search/ToolBar';
import SearchClientsContent from '../components/Clients/Search/Content';




class SearchClientsMenu extends React.Component {

  render() {
    return (
      <MenuPage>
      	<SearchClientsBar/>
      	<SearchClientsContent/>
      </MenuPage>
    );
  }
}

export default SearchClientsMenu;