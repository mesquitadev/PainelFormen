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

export const ItemBox = styled.div`
  flex-shrink: 0;
  background-color: #eee;
  border-radius: 12px;
  width: 150px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 24px;
  flex-direction: column;

  &:hover {
    background-color: #ddd;
  }
`;

export const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    minWidth: 150,
    minHeight: 150,
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  image: {
    width: 150,
    height: 200,
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
