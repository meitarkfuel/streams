import { promises as fs } from 'fs';
import { MemoryMonitor } from './memoryMonitor';


(async () => {
    const memory = new MemoryMonitor();
    memory.start(50);
    console.time("nostream read");
    //const res = await fs.readFile('bigfile2.txt', 'utf8');
    //const res = await fs.readFile('bigfile.txt', 'utf8');
    const res = await fs.readFile('test_nostreamwrite.txt', 'utf8');
    console.log(res.substring(res.length - 7));
    console.timeEnd("nostream read");
    memory.end();


})();