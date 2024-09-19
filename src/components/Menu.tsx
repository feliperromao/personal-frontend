import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PersonIcon from '@mui/icons-material/Person';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { useNavigate } from 'react-router-dom';

export const ADMIN_MENU = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon><DashboardIcon /></ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
  </React.Fragment>
);

export const PERSONAL_MENU = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <ListItemButton onClick={() => navigate('/personal')}>
        <ListItemIcon><CalendarMonthIcon /></ListItemIcon>
        <ListItemText primary="Agenda" />
      </ListItemButton>

      <ListItemButton onClick={() => navigate('/students')}>
        <ListItemIcon><PeopleIcon /></ListItemIcon>
        <ListItemText primary="Alunos" />
      </ListItemButton>

      <ListItemButton onClick={() => navigate('/exercises')}>
        <ListItemIcon><FitnessCenterIcon /></ListItemIcon>
        <ListItemText primary="Exercícios" />
      </ListItemButton>

      <ListItemButton onClick={() => navigate('/trainings')}>
        <ListItemIcon><SportsGymnasticsIcon /></ListItemIcon>
        <ListItemText primary="Treinos" />
      </ListItemButton>
    </React.Fragment>
  );
}

export const STUDENT_MENU = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon><FitnessCenterIcon /></ListItemIcon>
      <ListItemText primary="Treinos" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon><LocalDiningIcon /></ListItemIcon>
      <ListItemText primary="Dieta" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon><TrendingUpIcon /></ListItemIcon>
      <ListItemText primary="Progresso" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon><PersonIcon /></ListItemIcon>
      <ListItemText primary="Perfil" />
    </ListItemButton>
  </React.Fragment>
);



export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <FitnessCenterIcon />
      </ListItemIcon>
      <ListItemText primary="Treinos" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <TrendingUpIcon />
      </ListItemIcon>
      <ListItemText primary="Progresso" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Perfil" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);