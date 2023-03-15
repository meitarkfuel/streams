import { promises as fs, createReadStream } from 'fs';
import { MemoryMonitor } from './memoryMonitor';


(async () => {
    const memory = new MemoryMonitor();
    memory.start(20);
    console.time("stream read");
    const readStream = createReadStream('SUCCEEDED_TO_EXECUTE_12_4_2022_1670148774715.csv', {
        encoding: 'utf-8',
        //highWaterMark: 1024
    })

    for await (const chunk of readStream) {
        console.log(chunk);
    }
    memory.end();
    console.timeEnd("stream read");
   
})();