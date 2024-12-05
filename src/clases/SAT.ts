import puppeteer from "puppeteer";
import jsdom from "jsdom";
import { sinAcentos } from "../helpers/sinAcentos";
import { InfoSAT } from "../interfaces/InfoSAT.interface";
import { catalogo } from "../data/CatalogoRegimen";
export  class  SAT {

     private static formatearRegimen = (regimen: string) => {
        regimen = regimen.replace(/^Régimen de las\s*/, '');
        regimen = regimen.replace(/^Régimen de\s*/, '');
        regimen = regimen.replace(/^Régimen\s*/, '');
        const code = catalogo.find(c => c.descripcion === regimen)?.id || 0;        
        return { descripcion: regimen, code };
    }
    
     static obtenerCodigoRegimen = (regimen: string[] | string) => {    
        return typeof regimen === 'string' ? SAT.formatearRegimen(regimen) : regimen.map(r => SAT.formatearRegimen(r));
    }
    
    static traerInfo = async (url:string ): Promise<{ error: boolean, info: InfoSAT | null }> => {                        
        const browser = await puppeteer.launch();
        try {                
            const page = await browser.newPage();
            let response = await page.goto(url);
            const body = await response!.text();
            const { window: { document } } = new jsdom.JSDOM(body);
            let contenido: InfoSAT = {};
            contenido["rfc"] = url.split("_")[1];
            contenido["regimen"] = [];
            let content = document.querySelectorAll('[data-ri]');
        
            content.forEach((element: any) => {
                const [label, valor] = element.textContent.split(":");
                
                let newLabel = sinAcentos(label.replaceAll(' ', '')).toLowerCase();
                if (newLabel === "regimen") {
                    contenido[newLabel] = [...contenido[newLabel], valor as string];
                } else {
                    contenido[newLabel] = valor;
                }
            });
            await browser.close();
            return { error: false, info: contenido };            
        } catch (error) {
            await browser.close();
            return { error: true, info: null };
        }


    }

}