const express = require('express');

const invoiceRoutes = require('./routes/invoice-routes');

const app = express();

app.use('/api/invoice', invoiceRoutes);

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => `I Am Running On Port ${PORT}`);
