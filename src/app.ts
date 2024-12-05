
import * as fs from 'fs';
import { SAT } from './clases/SAT';
import { obtenerValorQR } from './adapter/obtenerValorQr.adapter';

const main = async (fullPath:string) => {
    const files = fs.readdirSync(fullPath);
    for (const file of files) {
        const pathFile = fullPath + '\\' + file;        
        try {
            const ligaQR = await obtenerValorQR(pathFile)            
            const { error, info } = await SAT.traerInfo(ligaQR);
            if (error) {
                continue;
            }            
            const { rfc, regimen, cp, situaciondelcontribuyente } = info!;
            const data ={ ligaQR, rfc, regimen: SAT.obtenerCodigoRegimen(regimen), cp, situaciondelcontribuyente };
            console.log(data);                        
        } catch (err) {
            console.log(err);
        }
    }
}

const fullPath = __dirname + '\\files';
main(fullPath);



