import ipp from 'ipp';
import bwipjs from 'bwip-js';

function gerarCodigoDeBarrasBase64(numero) {
    const options = {
        bcid: 'code128',
        text: numero.toString(),
        scale: 10,
        height: 14,
        includetext: true,
        textxalign: 'center',
        textyalign: 'bottom',
        paddingwidth: 5,
        paddingheight: 5
    };
    return new Promise((resolve, reject) => {
        bwipjs.toBuffer(options, (err, png) => {
            if (err) {
                reject(err);
            } else {
                // Converter a imagem para base64
                const base64Image = Buffer.from(png).toString('base64');
                resolve(base64Image);
            }
        });
    });
}

export function imprimirEtiqueta(tombo) {
    return gerarCodigoDeBarrasBase64(tombo)
        .then(base64Image => {
            // Configurações da impressora
            const printerUri = 'http://localhost:631/printers/XP-365B';
            const mediaSize = 'Custom.50x30mm';

            // Criar um job de impressão
            const printJob = {
                "operation-attributes-tag": {
                    "attributes-charset": "utf-8",
                    "attributes-natural-language": "pt-br",
                    "printer-uri": printerUri,
                    "requesting-user-name": "LibriX Execution",
                    "job-name": "Etiqueta - LibriX",
                    "document-format": "application/octet-stream",
                },
                "job-attributes-tag": {
                    "media": mediaSize,
                },
                data: Buffer.from(base64Image, 'base64'),
            };

            // Enviar o job de impressão para a impressora
            const printer = ipp.Printer(printerUri);
            return new Promise((resolve, reject) => {
                printer.execute('Print-Job', printJob, (err, response) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response);
                    }
                });
            });
        });
}
