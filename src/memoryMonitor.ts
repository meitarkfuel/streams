export class MemoryMonitor {
    private intrvl: NodeJS.Timer | undefined;
    private maxMem: NodeJS.MemoryUsage | undefined;
    start(interval = 250) {
        this.intrvl = setInterval(() => {
            const curMemory = process.memoryUsage();
            if (!this.maxMem) {
                this.maxMem = curMemory;
                return;
            }
            for (const prop in this.maxMem) {
                const _prop = prop as keyof NodeJS.MemoryUsage;
                if (curMemory[_prop]  > this.maxMem[_prop]) {
                    this.maxMem[_prop] = curMemory[_prop];
                }
            }
        }, interval)    
    }

    print() {
        if (!this.maxMem) {
            return;
        }
        console.log('Heap Used:', this.maxMem.heapUsed/1024/1024, "Mb");
        //for (const prop of Object.keys(this.maxMem)) {
            //console.log(prop, this.maxMem[prop as keyof NodeJS.MemoryUsage] / 1024 /1024, "Mb");
        //}

    }

    end() {
        if (this.intrvl) {
            clearInterval(this.intrvl);
        }
        this.print();
    }
}