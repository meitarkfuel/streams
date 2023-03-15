import { promises as fs, createReadStream } from 'fs';
import { pipeline, Transform, Writable } from 'stream';
import { MemoryMonitor } from './memoryMonitor';

let remainder = '';

const splitLine = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
        const str: string = chunk.toString('utf-8');
        const lines = str.split('\n');
        lines[0] = remainder + lines[0];
        remainder = '';
        if (str[str.length - 1] !== '\n') {
            //we have remainder
            remainder = lines.pop()!;
            //console.log('remainder is: ', remainder)
        }
        else {
            //console.log('no remainder')
        }

        //console.log(lines)
        this.push(lines)
        //this.push(Buffer.from(JSON.stringify(lines)))
        callback();
    },
});

const printStream = new Writable({
    objectMode: true,
    write(chunk: string[], encoding, callback) {
        for (const line of chunk) {
            console.log('\n', line);
        }
        callback();
    },
});

(async () => {
    const memory = new MemoryMonitor();
    memory.start(50);
    console.time("stream read");
    const readStream = createReadStream('SUCCEEDED_TO_EXECUTE_12_4_2022_1670148774715.csv', {
        encoding: 'utf-8',
        //highWaterMark: 1024
    })

    readStream.on('end', () => {

    })
    pipeline(readStream, splitLine, printStream, (err) => {
        err ? console.error(err) : console.log('success');
        console.timeEnd("stream read");
        memory.end();
    });
})();