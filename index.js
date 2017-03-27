const chalk = require('chalk');
const info = console.info;
const warn = console.warn;
const error = console.error;

module.exports = function (lbapp, options) {
    try {
        lbapp.on('started', () => {
            if (options.authMiddleware) {
                lbapp.io.use(function (socket, next) {
                    const accessToken = socket.handshake.query.accessToken;
                    if (!accessToken) {
                        return next(new Error('There is no access token to make a handshake'));
                    }
                    lbapp.models.AccessToken.findById(accessToken, function (err, model) {
                        if (err) {
                            error('ERROR: ', err);
                            return next(new Error(err));
                        }
                        if (!model) {
                            return next(new Error('The access token provided is not valid or expired.'))
                        }
                        socket.id = model.userId;
                        return next();
                    });
                    info(chalk.green('Authentication middleware for socket.io connections is running.'));
                });
            }
            else {
                warn(chalk.yellow('Authentication middleware using socket was not enabled'));
            }
        });
    }
    catch (ex) {
        error(chalk.red(ex.message));
    }
};
