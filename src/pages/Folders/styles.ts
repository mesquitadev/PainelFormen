// Styles
import styled from '@emotion/styled';
import { makeStyles } from '@mui/styles';
import { styled as materialStyled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';

export const Content = styled.div`
  padding: 16px;
  align-items: center;
  justify-content: center;
`;

export const useStyles = makeStyles(() => ({
  card: {
    '&:hover': {
      backgroundColor: '#CFD4DF',
    },
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
}));

export const BootstrapDialog = materialStyled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
export const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
