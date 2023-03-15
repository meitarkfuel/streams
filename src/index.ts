import { MemoryMonitor } from "./memoryMonitor";

const memory = new MemoryMonitor();
memory.start();
memory.print();
const arr = []
console.time("loop");
for (let i = 0; i < 100000000; i++) {
    arr.push(i);
}
console.timeEnd("loop");
setTimeout(() => {
    memory.end();
}, 5000);