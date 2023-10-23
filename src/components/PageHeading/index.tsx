import { Divider, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { ReactNode, useCallback } from 'react';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router';
interface PageHeadingProps {
  pageTitle: string;
  rightSideContent?: ReactNode;
  isBack?: boolean;
}

export default function PageHeading({ pageTitle, rightSideContent, isBack }: PageHeadingProps) {
  const history = useHistory();
  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);
  return (
    <Box sx={{ py: 2 }}>
      <Stack direction='row' justifyContent='space-between' spacing={4}>
        <Stack spacing={1} direction={isBack ? 'row' : 'column'}>
          {isBack && (
            <IconButton onClick={handleGoBack}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant='h4' fontWeight='bold'>
            {pageTitle}
          </Typography>
        </Stack>
        {rightSideContent && <div>{rightSideContent}</div>}
      </Stack>
      <Divider sx={{ my: 2 }} />
    </Box>
  );
}
