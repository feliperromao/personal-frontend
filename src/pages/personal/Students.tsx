import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { PERSONAL_MENU } from '../../components/Menu';
import { Grid, Paper } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import FloatingButton from '../../components/FloatingButton';
import FormDialog from '../../components/FormDialog';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LIST_STUDENTS_QUERY, CREATE_STUDENT_MUTATION, DELETE_STUDENT_MUTATION } from '../../graphql/users';
import DeleteDialog from '../../components/DeleteDialog';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const paginationModel = { page: 0, pageSize: 5 };

const defaultTheme = createTheme();

const ListStudents = (personal_id: string) => {
  const { data, loading, error, refetch } = useQuery(LIST_STUDENTS_QUERY, { variables: { personal_id } });

  return {
    users: data?.listStudents,
    loading,
    error,
    refetch,
  };
};

const Students: React.FC = () => {
  const [formDialogIsOpen, setOpenFormDialog] = React.useState(false);
  const [deleteDialogIsOpen, setOpenDeleteDialog] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const [deleteUserId, setDeleteUserId] = React.useState<string | null>(null); 

  const handleOpenFormDialog = () => {
    setOpenFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
  };


  const handleEditUserClick = (id: GridRowId) => {
    console.log("🚀 ~ handleEditUserClick ~ id:", id)
  }
  
  const handleDeleteUserClick = (id: GridRowId) => {
    console.log("🚀 ~ handleDeleteUserClick ~ id:", id)
    setDeleteUserId(id.toString())
    setOpenDeleteDialog(true)
  }

  const handleCloseDeleteialog = async (confirm: boolean) => {
    if (confirm) {
      console.log("🚀 ~ deleteUserId:", deleteUserId)
      await delete_user_request({variables: {id: deleteUserId}})
      refetch()
    }
    setOpenDeleteDialog(false);
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 200 },
    { field: 'email', headerName: 'E-mail', width: 200 },
    {
      field: 'blocked',
      headerName: 'Status',
      width: 200,
      valueFormatter: value => (value ? 'Desabilitado' : 'Ativo')
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Editar/Excluir',
      width: 200,
      getActions: ({ id }) => {
  
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Save"
            sx={{
              color: 'primary.main',
            }}
            onClick={() => handleEditUserClick(id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={() => handleDeleteUserClick(id)}
            color="inherit"
          />,
        ];
      },
    }
  ];

  const [create_user_request] = useMutation(CREATE_STUDENT_MUTATION);
  const [delete_user_request] = useMutation(DELETE_STUDENT_MUTATION);

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries((formData as any).entries());
      console.log(formJson);

      await create_user_request({variables: {
        name: formJson.name,
        email: formJson.email,
        password: formJson.password,
        personal_id: user.id
      }})
      refetch()
    } catch (error) {
      console.error('Create user error:', error);
    }
  };

  let userData = localStorage.getItem('user');
  const token = localStorage.getItem('auth-token');
  if (!userData || !token) {
    throw new Error('User not authenticated');
  }
  const user = JSON.parse(userData)
  
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const personal_id = user.id
  
  const { users, loading, error, refetch } = ListStudents(personal_id)
  const rows = users;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Personal | Alunos Cadastrados
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <PERSONAL_MENU />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
              <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{ pagination: { paginationModel } }}
                  pageSizeOptions={[5, 10, 50]}
                  checkboxSelection
                  sx={{ border: 0 }}
                />
              </Paper>
              </Grid>
            </Grid>
          </Container>
          <FormDialog
            formDialogIsOpen={formDialogIsOpen}
            handleCloseFormDialog={handleCloseFormDialog}
            handleSubmitForm={handleSubmitForm}
            />
          <DeleteDialog handleCloseDeleteialog={handleCloseDeleteialog} isOpen={deleteDialogIsOpen} />
          <FloatingButton onClick={() => handleOpenFormDialog()} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Students;