import { promises as fs, createReadStream } from 'fs';
import { MemoryMonitor } from './memoryMonitor';


(async () => {
    const memory = new MemoryMonitor();
    memory.start(50);
    console.time("stream read");
    const readStream = createReadStream('bigfile.txt',{
        encoding: 'utf-8',
        //highWaterMark: 1024*1024*300
    })
    console.log('readable flowing:', readStream.readableFlowing);
    readStream.on('data', (chunk) => {
        //console.log(chunk);
    });
    console.log('readable flowing:', readStream.readableFlowing);
    
    readStream.on('end', ()=> {
        console.timeEnd("stream read");
        memory.end();
    })
})();