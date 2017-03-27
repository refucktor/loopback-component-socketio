const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const info = console.log;
const error = console.error;

const modelsDir = path.resolve(__dirname + '/../models/');
const parentProjModelsDir = path.resolve(__dirname + '/../../../common/models/');
const serverDir = path.resolve(__dirname + '/../../../server/');
const socketLine = "app.io = require('socket.io')(app.start());";

fs.stat(parentProjModelsDir, (err) => {
    try {
        if (err) {
            error(chalk.red("There is no common/models directory in your loopback app. " +
                "Are you sure you installed this package inside loopback app?\n"));
            throw err;
        }
        info(chalk.green("Creating geoposition model..."));
        fs.createReadStream(modelsDir + '/geoposition.json').pipe(fs.createWriteStream(parentProjModelsDir + '/geoposition.json'));
        fs.createReadStream(modelsDir + '/geoposition.js').pipe(fs.createWriteStream(parentProjModelsDir + '/geoposition.js'));
        fs.readFile(serverDir + '/server.js', 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            if (data.indexOf(socketLine) == -1) {
                const result = data.replace('app.start();', socketLine);
                fs.writeFile(serverDir + '/server.js', result, 'utf8', (err) => {
                    if (err) {
                        error(chalk.red(err.message));
                        throw err;
                    }
                });
            }
        });
        info(chalk.blue("Check README file to enable geoposition model in your app."));
    }
    catch (ex) {
        error(chalk.red(ex.message));
    }
});

