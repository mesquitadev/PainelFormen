import { Img, useStyles } from '@/pages/Folders/styles';
import Paper from '@mui/material/Paper';
import { ButtonBase, Grid } from '@mui/material';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import ListItemText from '@mui/material/ListItemText';
import { useLoading } from '@/hooks/useLoading';
import * as React from 'react';
import { useCallback, useState } from 'react';
import api from '@/services';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { CssVarsProvider } from '@mui/joy';

export const FolderCard = ({ item, ...rest }: any) => {
  const classes = useStyles();
  return (
    <Paper
      sx={{
        cursor: 'pointer',
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
      }}
      className={classes.card}
      {...rest}
    >
      <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <Grid item>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction='column' spacing={2}>
            <Grid item xs>
              <ListItemText
                primary={item.name}
                secondary={`${item.children.count} pastas e ${item.files.count} arquivos.`}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export interface ImageData {
  item: {
    id: number;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      large: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path: string | null;
        size: number;
        width: number;
        height: number;
        provider_metadata: {
          public_id: string;
          resource_type: string;
        };
      };
      small: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path: string | null;
        size: number;
        width: number;
        height: number;
        provider_metadata: {
          public_id: string;
          resource_type: string;
        };
      };
      medium: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path: string | null;
        size: number;
        width: number;
        height: number;
        provider_metadata: {
          public_id: string;
          resource_type: string;
        };
      };
      thumbnail: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path: string | null;
        size: number;
        width: number;
        height: number;
        provider_metadata: {
          public_id: string;
          resource_type: string;
        };
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: {
      public_id: string;
      resource_type: string;
    };
    folderPath: string;
    createdAt: string;
    updatedAt: string;
    folder: any | null; // Se "folder" for um objeto específico, você pode substituir "any" pelo tipo adequado.
  };
  onClick?: () => void;
}

export const AssetCard = ({ item, onClick }: ImageData) => {
  const classes = useStyles();
  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
      }}
      onClick={onClick}
    >
      <ButtonBase sx={{ width: '100%', height: '100%' }}>
        <Img
          src={item.url ? item.url : 'https://placehold.co/200x270?text=Produto+Sem+Imagem'}
          alt={item.name}
          className={classes.image}
        />
      </ButtonBase>
    </Paper>
  );
};

export interface DeleteModalProps {
  itemId: number;
  onClose: () => void;
}

export function DeleteModal({ itemId, onClose }: DeleteModalProps) {
  const { setLoading } = useLoading();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = useCallback(() => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const handleDeleteFile = useCallback(
    async (fileId: number) => {
      setLoading(true);
      try {
        await api.post(`/upload/actions/bulk-delete`, {
          fileIds: [fileId],
        });
        setLoading(false);
        handleClose();
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    },
    [handleClose, setLoading],
  );

  return (
    <CssVarsProvider>
      <Button
        variant='outlined'
        color='danger'
        endDecorator={<DeleteForever />}
        onClick={handleOpen}
      >
        Deletar Imagem
      </Button>

      <Modal open={open} onClose={handleClose}>
        <ModalDialog variant='outlined' role='alertdialog'>
          <DialogTitle>
            <WarningRoundedIcon />
            Deseja deletar a imagem ?
          </DialogTitle>
          <Divider />
          <DialogContent>Certeza que quer deletar a imagem?</DialogContent>
          <DialogActions>
            <Button variant='solid' color='danger' onClick={() => handleDeleteFile(itemId)}>
              Sim, deletar
            </Button>
            <Button variant='plain' color='neutral' onClick={handleClose}>
              Não
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </CssVarsProvider>
  );
}
