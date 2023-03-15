import { promises as fs } from 'fs';
import { MemoryMonitor } from './memoryMonitor';

const LOOP_SIZE = 1_000_000;

(async () => {
    const memory = new MemoryMonitor();
    memory.start();
    console.time("nostream write");
    const fileHandle = await fs.open("test_nostreamwrite.txt", "w");

    for (let i = 0; i < LOOP_SIZE; i++) {
        await fileHandle.write(` ${i} `);
    }
    fileHandle.close();
    console.timeEnd("nostream write");
    memory.end();
})();