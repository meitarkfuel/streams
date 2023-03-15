import { promises as fs } from 'fs';
import { MemoryMonitor } from './memoryMonitor';

const LOOP_SIZE = 1_000_000;

(async () => {
    const memory = new MemoryMonitor();
    memory.start(50);
    console.time("nostream write");
    const fileHandle = await fs.open("test_streamwrite.txt", "w");
    const writeStream = fileHandle.createWriteStream();
    console.log(writeStream.writableHighWaterMark)
    writeStream.on('finish', ()=> {
        console.timeEnd("nostream write");
        memory.end();
    })

    for (let i = 0; i < LOOP_SIZE; i++) {
        writeStream.write(` ${i} `);
    }
    writeStream.end();

   
})();