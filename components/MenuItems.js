import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Edit from 'material-ui-icons/Edit';
import DraftsIcon from 'material-ui-icons/Drafts';
import Approved from 'material-ui-icons/PlayListAddCheck';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';
import Group from 'material-ui-icons/Group';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import Grid from 'material-ui/Grid';
import { Link,withRouter } from 'react-router-dom';

const styles = {
    div: {
    margin: '10px',
  },
  grid:{
    'marginTop':65,
    'zIndex':1800,
    position:'fixed'
  },
};
const menuList = [{icon:'group',label:'Consulta Pendiente Pagos',link:'/'},
                  {icon:'edit',label:'Solicitud Préstamos', link:'/menu/createclients'},
                  {icon:'playlist_add_check',label:'Préstamos', link:'/menu/listclients'},
                  {icon:'print',label:'', link:'/print'},
                  {icon:'chevron_left',label:'Solicitud', link:'/test'},
                  {icon:'contacts',label:'Control Usuarios', link:'/menu/users'},
                  {icon:'local_atm',label:'Finanzas', link:'/menu/debt'}
                  ]


var click = ()=>{console.log(this.props)}
const Items = withRouter( ({ history }) => ( 

    menuList.map( item => 
        <Grid key={item.icon+item.label} item>
            <Tooltip  title={item.label} placement="right">
                
                    <Button  mini variant="fab" color="primary" aria-label="add" 
                    onClick={()=>{history.push(item.link)}} >
                        
                            <Icon>
                                {item.icon}
                            </Icon>
                        
                    </Button>
                
            </Tooltip>
        </Grid>
     )
))

export const MenuItems = (
    <Grid item container xs={1} alignItems="center" direction="column" spacing={8} style={styles.grid}>
    <Items/>
        
    </Grid>
)
export const mailFolderListItems = (
  <div>
    <div className="hint--rounded hint-info hint--bottom hint--bounce" aria-label="Solicitud Préstamos">
      <ListItem button>
       <ListItemIcon>
          <Edit />

        </ListItemIcon>
      </ListItem>
    </div>
    <ListItem button>
      <ListItemIcon>
        <Approved />
      </ListItemIcon>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
    </ListItem>
  </div>
);

export const otherMailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <MailIcon />
      </ListItemIcon>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
    </ListItem>
  </div>
);