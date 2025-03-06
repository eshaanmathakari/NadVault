import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Alert,
} from '@mui/material';

function Vault() {
  const [loading, setLoading] = useState(false);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Time-Locked Vaults
      </Typography>

      <Alert severity="info" sx={{ mb: 4 }}>
        Smart contracts are not yet deployed. Please deploy the contracts to interact with this feature.
      </Alert>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Create Vault
              </Typography>
              <Typography color="text.secondary">
                Feature will be available after smart contract deployment.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  disabled={true}
                >
                  Create Vault
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Vault; 