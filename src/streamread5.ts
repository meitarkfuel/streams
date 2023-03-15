import { promises as fs, createReadStream } from 'fs';
import { MemoryMonitor } from './memoryMonitor';


(async () => {
    const memory = new MemoryMonitor();
    memory.start(20);
    console.time("stream read");
    const { Readable } = require('node:stream');

    async function* fibonacci() {
        let [a, b] = [0, 1]
        for(let i=0; i<100; i++) {
            yield a;
            [a, b] = [b, a + b]
        }
    }

    const readable = Readable.from(fibonacci());

    readable.on('data', (chunk: any) => {
        console.log(chunk);
    });
    memory.end();
    console.timeEnd("stream read");

})();