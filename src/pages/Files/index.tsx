import { useCallback, useEffect, useState } from 'react';
import { Box, Button, ButtonBase, Fab, Grid, SvgIcon, Typography } from '@mui/material';
import ModalImage from 'react-modal-image';
// Hooks
import { useHistory, useParams } from 'react-router';
import { useLoading } from '@/hooks/useLoading';

import Sheet from 'react-modal-sheet';
// Icons
import AddIcon from '@mui/icons-material/Add';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
// Services
import api from '@/services';
import {
  BootstrapDialog,
  Content,
  ItemBox,
  useStyles,
  VisuallyHiddenInput,
} from '@/pages/Files/styles';
import Paper from '@mui/material/Paper';
import ListItemText from '@mui/material/ListItemText';
import { NotFound, PageHeading } from '@/components';
import { useSnackBar } from '@/hooks/useSnackBar';

interface Params {
  folderId: string | undefined;
  pathId: string | undefined;
}

export const ImageCard = ({ item }: any) => {
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
    >
      <ButtonBase>
        <ModalImage
          small={
            item.formats.small
              ? item.formats.small.url
              : 'https://placehold.co/200x270?text=Produto+Sem+Imagem'
          }
          medium={
            item.formats.medium
              ? item.formats.small.url
              : 'https://placehold.co/200x270?text=Produto+Sem+Imagem'
          }
          large={
            item.formats.large
              ? item.formats.small.url
              : 'https://placehold.co/200x270?text=Produto+Sem+Imagem'
          }
          alt={item.name}
          className={classes.image}
        />
      </ButtonBase>
      <ListItemText primary={item.name} />
    </Paper>
  );
};

export default function Files() {
  const { setError, setMessage, setType } = useSnackBar();
  const { folderId, pathId } = useParams<Params>();
  const [showModalSheet, setShowModalSheet] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalUpload, setModalUpload] = useState(false);
  const [files, setFiles] = useState<any>([]);
  const [fileToDelete, setFileToDelete] = useState<any>(null);
  const [images, setImages] = useState([] as any);
  const [imageURLS, setImageURLs] = useState([]);

  const history = useHistory();
  const { setLoading } = useLoading();
  // Modal Upload
  const handleOpenUploadModal = () => {
    setModalUpload(true);
    handleCloseModalSheet();
  };
  const handleCloseUploadModal = () => {
    setModalUpload(false);
  };
  // Modal Sheet
  const handleOpenModalSheet = () => {
    setShowModalSheet(true);
  };
  const handleCloseModalSheet = () => {
    setShowModalSheet(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const fetchAssets = useCallback(
    async (folderId: string | undefined, pathId: string | undefined) => {
      setLoading(true);
      try {
        const response = await api.get(
          `/upload/files?sort=createdAt:DESC&page=1&pageSize=12&folder=${folderId}&filters[$and][0][folderPath][$eq]=/${pathId}`,
        );
        setFiles(response.data.results);
      } catch (e) {
        console.log(e);
        setError(true);
        setType('error');
        setMessage('Erro ao buscar imagens');
      } finally {
        setLoading(false);
      }
    },
    [setError, setLoading, setMessage, setType],
  );

  const handleDeleteFile = useCallback(
    async (fileId: string) => {
      setLoading(true);
      try {
        await api.post(`/upload/actions/bulk-delete`, {
          fileIds: [fileId],
        });
        fetchAssets(folderId, pathId);
        setFileToDelete(null);

        handleCloseDeleteModal();
        setLoading(false);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    },
    [folderId, fetchAssets, pathId, setLoading],
  );

  const handleOpenAndCloseUploadModal = () => {
    setModalUpload((state) => !state);
  };

  function onImageChange(e: any) {
    setImages([...e.target.files]);
  }

  const handleUpload = useCallback(async () => {
    setLoading(true);
    try {
      const formData = new FormData();

      images.forEach((image: any) => {
        const blob = new Blob([image], { type: image.type });
        formData.append('files', blob, image.name);
      });
      const fileInfo = {
        folder: folderId,
      };

      formData.append('fileInfo', JSON.stringify(fileInfo));
      await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImages([]);
      setImageURLs([]);
      fetchAssets(folderId, pathId);
      handleCloseUploadModal();
      console.log('Upload de imagem bem-sucedido!');
      setLoading(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [folderId, fetchAssets, images, pathId, setLoading]);

  useEffect(() => {
    if (folderId && pathId) {
      fetchAssets(folderId, pathId);
    } else {
      history.push('/pagina-de-erro');
    }
  }, [folderId, fetchAssets, history, pathId]);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls: any = [];
    images.forEach((image: any) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  return (
    <Box>
      <PageHeading
        pageTitle='Pastas'
        isBack
        rightSideContent={
          <Button
            startIcon={
              <SvgIcon fontSize='small'>
                <AddIcon />
              </SvgIcon>
            }
            variant='contained'
          >
            Adicionar Imagens
          </Button>
        }
      />
      <Box>
        <Grid container spacing={{ xs: 2, md: 3 }} justifyContent='center'>
          {files.length === 0 ? (
            <NotFound />
          ) : (
            files.map((arquivo: any) => (
              <Grid item key={arquivo.id} xs={6} sm={6} md={4} lg={3}>
                <ImageCard item={arquivo} />
              </Grid>
            ))
          )}
        </Grid>

        <Fab color='primary' aria-label='add' style={{ position: 'fixed', bottom: 70, right: 20 }}>
          <AddIcon onClick={() => handleOpenModalSheet()} />
        </Fab>

        {/*Modal Sheet*/}
        <Sheet
          isOpen={showModalSheet}
          onClose={handleOpenModalSheet}
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
                        <ItemBox onClick={() => handleOpenUploadModal()}>
                          <CloudUploadIcon fontSize='large' />
                          <Typography variant='h6'>Fazer Upload</Typography>
                        </ItemBox>
                      </Grid>
                      <Grid item>
                        <ItemBox>
                          <CameraAltIcon fontSize='large' />
                          <Typography variant='h6'>Usar Camera</Typography>
                        </ItemBox>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Content>
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop onTap={handleCloseModalSheet} />
        </Sheet>

        {/*Dialog Delete Image*/}
        <Dialog
          open={showDeleteModal}
          onClose={handleOpenUploadModal}
          aria-labelledby='responsive-dialog-title'
        >
          <DialogTitle id='responsive-dialog-title'>{'Deseja deletar a imagem?'}</DialogTitle>

          <DialogActions>
            <Button onClick={handleCloseDeleteModal}>Não</Button>
            <Button onClick={() => handleDeleteFile(fileToDelete)}>Sim</Button>
          </DialogActions>
        </Dialog>

        {/*Upload Modal*/}
        <BootstrapDialog
          onClose={handleOpenAndCloseUploadModal}
          aria-labelledby='customized-dialog-title'
          open={modalUpload}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
            Adicionar Arquivos
          </DialogTitle>
          <IconButton
            aria-label='close'
            onClick={handleCloseUploadModal}
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
            <Button component='label' variant='contained' startIcon={<CloudUploadIcon />}>
              Selecionar Arquivos
              <VisuallyHiddenInput type='file' multiple accept='image/*' onChange={onImageChange} />
            </Button>
            <Grid container spacing={2} style={{ marginTop: '16px' }}>
              {imageURLS.map((imageSrc, index) => (
                <Grid item key={index} xs={6} md={4} lg={3}>
                  <img src={imageSrc} alt='not found' style={{ width: '100%', height: 'auto' }} />
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUploadModal}>Cancelar</Button>
            <LoadingButton loadingPosition='start' startIcon={<SaveIcon />} onClick={handleUpload}>
              Enviar Arquivos
            </LoadingButton>
          </DialogActions>
        </BootstrapDialog>
      </Box>
    </Box>
  );
}
