const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const revenueRoutes = require('./routes/revenueRoutes');
const summaryRoutes = require('./routes/summaryRoutes');
const authRoutes = require('./routes/authRoutes');
const { authenticateToken, authorizeAdmin, authorizeUserOrAdmin } = require('./middlewares/authMiddleware');

// Swagger UI
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const swaggerDocument = YAML.load(path.resolve(__dirname, 'resources', 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth', authRoutes);
app.use(authenticateToken);
app.use('/users', userRoutes);
app.use('/expenses', authorizeUserOrAdmin, expenseRoutes);
app.use('/revenues', authorizeUserOrAdmin, revenueRoutes);
app.use('/summary', authorizeUserOrAdmin, summaryRoutes);

module.exports = app;
