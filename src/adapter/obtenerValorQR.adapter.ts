
import fs from 'fs';
import jsQR from 'jsqr';
import ImageParser from 'image-parser';

export const obtenerValorQR = (fullPath:string):Promise<string> => {
    return new Promise((resolve, reject) => {
        const buffer = fs.readFileSync(fullPath);
        const img = new ImageParser(buffer);
          img.parse(function (err) {
            if (err) {
                return reject(err);
            }            
            try {
                const res = jsQR(img._imgBuffer, img.width(), img.height(), { inversionAttempts: 'dontInvert' });
                if (res) {                    
                    return resolve(res.data);
                }
            }
            catch (err) {
                
                return reject(err);
            }            
        });
    });
}