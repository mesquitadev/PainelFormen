import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import { NotFound, PageHeading } from '@/components';
import { AssetCard, DeleteModal, FolderCard } from './components';
// Hooks
import { useHistory } from 'react-router';
import { useLoading } from '@/hooks/useLoading';

import Sheet from 'react-modal-sheet';
// Icons
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';

import api from '@/services';

// Styles
import { Content, ItemBox } from '@/pages/Files/styles';
import { BootstrapDialog, Img } from '@/pages/Folders/styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Input from '@/components/Input';
import { useSnackBar } from '@/hooks/useSnackBar';

export default function Files() {
  const history = useHistory();
  const { loading, setLoading } = useLoading();
  const { setError, setMessage, setType } = useSnackBar();
  const [showModalSheet, setShowModalSheet] = useState(false);
  const [modalAddFolder, setModalAddFolder] = useState(false);
  const [folders, setFolders] = useState<any>([]);
  const [assets, setAssets] = useState<any>([]);
  const [selectedItem, setSelectedItem] = useState<any>({});
  const [showModalItem, setShowModalItem] = useState<boolean>(false);

  // Get Data
  const fetchAssets = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/upload/files?sort=createdAt:DESC&page=1&pageSize=100&filters[$and][0][folderPath][$eq]=/`,
      );
      setAssets(response.data.results);
    } catch (e) {
      console.log(e);
      setError(true);
      setType('error');
      setMessage('Erro ao buscar imagens');
    } finally {
      setLoading(false);
    }
  }, [setError, setLoading, setMessage, setType]);

  const fetchFolders = useCallback(async () => {
    setLoading(true);
    await api
      .get(
        `upload/folders?sort=createdAt:DESC&page=1&pageSize=100&pagination[pageSize]=-1&filters[$and][0][parent][id][$null]=true`,
      )
      .then((response) => {
        setFolders(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setType('error');
        setMessage('Erro ao buscar pastas');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setError, setLoading, setMessage, setType]);

  // Handlers
  const handleShowModalSheet = () => setShowModalSheet(!showModalSheet);
  const handleShowModalAddFolder = useCallback(
    () => setModalAddFolder(!modalAddFolder),
    [modalAddFolder],
  );
  const handleShowModalItem = useCallback(() => {
    setShowModalItem(!showModalItem);
    fetchAssets();
  }, [fetchAssets, showModalItem]);

  const handleFetchItem = useCallback(
    async (id: number) => {
      setLoading(true);
      try {
        const { data } = await api.get(`/upload/files?filters[id][$eq]=${id}`);
        setSelectedItem(data.results[0]);
        data.results[0] && handleShowModalItem();
      } catch (e) {
        console.log(e);
        setError(true);
        setType('error');
        setMessage('Erro ao buscar imagem');
      } finally {
        setLoading(false);
      }
    },
    [handleShowModalItem, setError, setLoading, setMessage, setType],
  );

  const handleGoToFiles = useCallback(
    (folderId: string, pathId: string) => {
      const newPathId = pathId.replace('/', '');
      history.push(`/files/folder/${Number(folderId)}/path/${Number(newPathId)}`);
    },
    [history],
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchFolders();
        await fetchAssets();
      } catch (error) {
        console.log(error);
        setError(true);
        setType('error');
        setMessage('Erro ao buscar dados!');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchAssets, fetchFolders, handleFetchItem, setError, setLoading, setMessage, setType]);

  const actions = [
    { icon: <SaveIcon />, name: 'Adicionar Pasta', action: () => handleShowModalAddFolder() },
  ];

  const signInFormSchema = yup.object().shape({
    name: yup.string().required('Este campo é obrigatório'),
  });

  interface FolderFormData {
    name: string;
  }

  const { handleSubmit, formState, control, reset } = useForm<FolderFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(signInFormSchema),
  });

  const { errors } = formState;

  const handleCreateFolder = async (values: FolderFormData) => {
    console.log(values);
    if (!loading) {
      setLoading(true);
      api
        .post('/upload/folders', {
          name: values.name,
          parent: null,
        })
        .then((response) => {
          console.log(response);
          reset();
          handleShowModalAddFolder();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
          reset();
          fetchFolders();
          handleShowModalAddFolder();
        });
    }
  };

  return (
    <Box>
      <PageHeading
        pageTitle='Pastas'
        rightSideContent={
          <Button
            startIcon={
              <SvgIcon fontSize='small'>
                <AddIcon />
              </SvgIcon>
            }
            onClick={handleShowModalAddFolder}
            variant='contained'
          >
            Adicionar Pasta
          </Button>
        }
      />
      <Box>
        <Grid container spacing={{ xs: 2, md: 3 }} justifyContent='center'>
          {folders.length === 0 ? (
            <NotFound />
          ) : (
            folders.map((pasta: any) => (
              <Grid item key={pasta.id} xs={6} sm={6} md={4} lg={3}>
                <FolderCard
                  item={pasta}
                  onClick={() => handleGoToFiles(pasta.pathId, pasta.path)}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      {/*Assets*/}
      <Box>
        <PageHeading pageTitle='Imagens' />
        <Grid container spacing={{ xs: 2, md: 3 }} justifyContent='center'>
          {assets.length === 0 ? (
            <NotFound />
          ) : (
            assets.map((asset: any) => (
              <Grid item key={asset.id} xs={6} sm={6} md={4} lg={3}>
                <AssetCard item={asset} onClick={() => handleFetchItem(asset.id)} />
              </Grid>
            ))
          )}
        </Grid>

        <Box
          sx={{
            position: 'fixed',
            bottom: 70,
            right: 20,
            transform: 'translateZ(0px)',
            flexGrow: 1,
          }}
        >
          <SpeedDial ariaLabel='SpeedDial basic example' icon={<SpeedDialIcon />}>
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                onClick={action.action}
                icon={action.icon}
                tooltipTitle={action.name}
              />
            ))}
          </SpeedDial>
        </Box>

        {/*Modal Sheet*/}
        <Sheet
          isOpen={showModalSheet}
          onClose={handleShowModalSheet}
          snapPoints={[180]}
          initialSnap={0}
        >
          <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content>
              <Content>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Grid container justifyContent='center' spacing={2}>
                      <Grid item>
                        <ItemBox>
                          <CloudUploadIcon fontSize='large' />
                          <Typography variant='h6'>Adicionar Pasta</Typography>
                        </ItemBox>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Content>
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop onTap={handleShowModalSheet} />
        </Sheet>

        {/*Add Folder*/}
        <Dialog
          onClose={handleShowModalAddFolder}
          aria-labelledby='customized-dialog-title'
          open={modalAddFolder}
        >
          <Box component='form' onSubmit={handleSubmit(handleCreateFolder)}>
            <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
              Adicionar Pasta
            </DialogTitle>
            <IconButton
              aria-label='close'
              onClick={handleShowModalAddFolder}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <Input
                type='text'
                label='Nome da Pasta'
                name='name'
                // @ts-ignore
                control={control}
                errors={errors.name && errors.name.message}
              />
            </DialogContent>
            <DialogActions>
              <LoadingButton
                loading={loading}
                loadingPosition='start'
                type='submit'
                startIcon={<SaveIcon />}
              >
                Salvar
              </LoadingButton>
              <Button onClick={handleShowModalAddFolder}>Cancelar</Button>
            </DialogActions>
          </Box>
        </Dialog>

        {/*Dialog Delete Image*/}

        <BootstrapDialog
          onClose={handleShowModalItem}
          aria-labelledby='customized-dialog-title'
          open={showModalItem}
        >
          <DialogTitle sx={{ m: 0, p: 2 }}>Imagem</DialogTitle>
          <IconButton
            aria-label='close'
            onClick={handleShowModalItem}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Box sx={{ maxHeight: 500, py: 5, px: 5, flexDirection: 'column' }}>
              <Img
                src={
                  selectedItem.url
                    ? selectedItem.url
                    : 'https://placehold.co/200x270?text=Produto+Sem+Imagem'
                }
                alt={selectedItem.name}
              />

              <Stack justifyContent='space-between' flexDirection='row' py={2}>
                <Typography>{selectedItem.name}</Typography>
                <DeleteModal itemId={selectedItem.id} onClose={handleShowModalItem} />
              </Stack>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleShowModalItem}>Fechar</Button>
          </DialogActions>
        </BootstrapDialog>
      </Box>
    </Box>
  );
}
