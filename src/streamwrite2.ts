import { createWriteStream, promises as fs, write, WriteStream } from 'fs';
import { MemoryMonitor } from './memoryMonitor';

const LOOP_SIZE = 1_000_000;

let writeStream: WriteStream;

function* writeToStream() {
    for (let i = 0; i < LOOP_SIZE; i++) {
        if (!writeStream.write(` ${i} `)) {
            console.log('yeilding')
            yield;
        }
    }
    writeStream.end();
}

(async () => {
    const memory = new MemoryMonitor();
    memory.start(50);
    console.time("nostream write");
    writeStream = createWriteStream('test_streamwrite2.txt', {
       highWaterMark: 1024*1024
       //highWaterMark: 8
    })
    console.log('highwatermark:',writeStream.writableHighWaterMark);
    writeStream.on('finish', ()=> {
        console.timeEnd("nostream write");
        memory.end();
    })
    const gen = writeToStream();

    writeStream.on('drain', ()=> {
        console.log('drained');
        gen.next();
    })

    gen.next();



   
})();