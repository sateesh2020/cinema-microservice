const { createContainer, asValue, asFunction, asClass } = require('awilix')

function initDI({ serverSettings, dbSettings, database, models, services }, mediator) {
    mediator.once('init', () => {
        mediator.on('db.ready', (db) => {
            const container = createContainer()

            // loading dependecies in a single source of truth
            container.register({
                database: asValue(db).singleton(),
                validate: asValue(models.validate),
                booking: asValue(models.booking),
                user: asValue(models.booking),
                ticket: asValue(models.booking),
                ObjectID: asClass(database.ObjectID),
                serverSettings: asValue(serverSettings),
                paymentService: asValue(services.paymentService),
                notificationService: asValue(services.notificationService)
            })

            // we emit the container to be able to use it in the API
            mediator.emit('di.ready', container)
        })

        mediator.on('db.error', (err) => {
            mediator.emit('di.error', err)
        })

        database.connect(dbSettings, mediator)

        mediator.emit('boot.ready')
    })
}

module.exports.initDI = initDI