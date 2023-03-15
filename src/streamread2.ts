import { promises as fs, createReadStream } from 'fs';
import { MemoryMonitor } from './memoryMonitor';


(async () => {
    const memory = new MemoryMonitor();
    memory.start(50);
    console.time("stream read");
    const readStream = createReadStream('SUCCEEDED_TO_EXECUTE_12_4_2022_1670148774715.csv',{
        encoding: 'utf-8',
        //highWaterMark: 1024*1024*300
    })
    readStream.on('data', (chunk) => {
        console.log('**********************************************************************************************************************************')
        console.log(chunk);
    });
    
    readStream.on('end', ()=> {
        console.timeEnd("stream read");
        memory.end();
    })
})();