// image-parser.d.ts
declare module 'image-parser' {
    class ImageParser {
        
        constructor(buffer: Buffer);
        width:() => number;
        height:() => number;
        _imgBuffer: Uint8ClampedArray;
        parse(callback: (err: Error | null) => void): void;
        imageData: {
            data: Uint8ClampedArray;
            width: number;
            height: number;
        };
        
    }
    export = ImageParser;
}