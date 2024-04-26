import QRCode, { QRCodeOptions, QRCodeRenderersOptions } from "qrcode"

var qrCanvas:HTMLCanvasElement;

export default function useQr() {
    
    function buildQr(message: string) {
        console.log('qrCanvas 1', qrCanvas)
         QRCode.toCanvas(message as string, options, function (err, canvas) {
            if (err) throw err
            console.log('canvas', canvas)
            qrCanvas=canvas
        })
    }

    function drawQr(containerClassName:string) {
            var container = document.querySelectorAll("."+containerClassName)
            if (!container)
                throw new Error("Your container id isn't exist!")
            console.log('qrCanvas', qrCanvas)
            if(qrCanvas){
                container?.forEach(item=>{
                    item.appendChild(qrCanvas)
                })
            } 
    }

    return { buildQr , drawQr};
}


var options: (QRCodeOptions | QRCodeRenderersOptions) = {
    errorCorrectionLevel: "H",
    width: 200,
    color: {
        light: "#181C20",
        dark: "#F3F3F3"
    },
}
