const app = require('./app');
const PORT = 3000;

const { connect } = require('mongoose');
const { MONGO_DB_URL } = require('../api/config/constants/settings');

(async () => {
    await connect(MONGO_DB_URL);

    app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
})();


