const dbSettings = {
    db: process.env.DB || 'booking',
    user: process.env.DB_USER || 'intellibuild',
    pass: process.env.DB_PASS || 'd0ntf0rg3tm3',
    servers: [
        'localhost:32769'
    ],
    dbParameters: () => ({
        w: 'majority',
        wtimeout: 10000,
        j: true,
        native_parser: false,
    }),
    serverParameters: () => ({
        autoReconnect: true,
        poolSize: 10,
        socketoptions: {
            keepAlive: 300,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 30000
        }
    })
}

const serverSettings = {
    port: process.env.PORT || 3000,
    ssl: require('./ssl')
}

module.exports = Object.assign({}, { dbSettings, serverSettings })