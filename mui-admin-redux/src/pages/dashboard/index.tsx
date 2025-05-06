import DashboardLayout from '@/components/DashboardLayout';
import { Typography, Box } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
     <DashboardLayout>
    <Box sx={{ textAlign: 'center', marginTop: '100px' }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Admin Dashboard
      </Typography>
      <Typography variant="h6" gutterBottom>
        Please select from the sidebar to get started.
      </Typography>
      
    </Box>
    </DashboardLayout>
  );
}

