import QRCode, { QRCodeOptions, QRCodeRenderersOptions } from "qrcode"
import QrScanner from 'qr-scanner'
var qrCanvas: HTMLCanvasElement;

export default function useQr() {

    function buildQr(message: string) {
        console.log('qrCanvas 1', qrCanvas)
        QRCode.toCanvas(message as string, options, function (err, canvas) {
            if (err) throw err
            console.log('canvas', canvas)
            qrCanvas = canvas
        })
    }

    function drawQr(containerClassName: string) {
        var container = document.querySelectorAll("." + containerClassName)
        if (!container)
            throw new Error("Your container id isn't exist!")
        console.log('qrCanvas', qrCanvas)
        if (qrCanvas) {
            container?.forEach(item => {
                item.appendChild(qrCanvas)
            })
        }
    }

    async function scanImage(fileSelector: any) {
        const file = fileSelector;
        if (!file) {
            return;
        }

        const qr_data = QrScanner.scanImage(file, { returnDetailedScanResult: true })
            .then(result => { return result.data })
            .catch(e => { console.log("scan error: ", e) });

        return qr_data
    }

    return { buildQr, drawQr, scanImage };
}


var options: (QRCodeOptions | QRCodeRenderersOptions) = {
    errorCorrectionLevel: "H",
    width: 200,
    color: {
        light: "#181C20",
        dark: "#F3F3F3"
    },
}
