function newRandomGenerator(s: number) {
    var mask = 0xffffffff
    var m_w = (123456789 + s) & mask
    var m_z = (987654321 - s) & mask
    return function() {
        m_z = (36969 * (m_z & 65535) + (m_z >>> 16)) & mask
        m_w = (18000 * (m_w & 65535) + (m_w >>> 16)) & mask
        var result = ((m_z << 16) + (m_w & 65535)) >>> 0
        result /= 4294967296
        return result
    }
}
const random = newRandomGenerator(1234)
const output: Array<String> = new Array<String>()
class MyEvent {
    time: number = 0
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor() {}
    execute(s: Simulator) {
        throw new Error('unimplemented');
    }
}
class RandomGeneratorEvent extends MyEvent {
    constructor(t: number) {
        super()
        this.time = t
    }
    execute(s: Simulator) {
        output.push(this.time + ' RandomGeneratorEvent')

        const rnd = Math.floor(random() * 100)

        if (rnd < 90) {
            return
        }

        for (var i = 0; i < rnd; i++) {
            s.add(new RandomGeneratorEvent(
                s.now() + random() * 1000.0
            ))
        }
    }
}
class PendingEvents {
    events: Array<MyEvent> = new Array<MyEvent>()

    pop(): MyEvent {
        return this.events.pop()!
    }

    add(e: MyEvent) {
        this.events.push(e)
    }
    empty(): boolean {
        return this.events.length === 0
    }
}
class Simulator {
    events: PendingEvents = new PendingEvents()
    time: number = 0

    run() {
        const limit = 3000
        let count = 0
        const startTime = performance.now()

        while (!this.events.empty() && count < limit) {
            const ev = this.events.pop()
            if (ev.time < this.time) {
                // throw new Error('Invalid order: ' + ev.time + ' after ' +
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                this.time
            }
            this.time = ev.time
            ev.execute(this)
            count++
        }

        const endTime = performance.now()

        output.push('Finished simulating ' + count + ' events in ' + (endTime -
            startTime) + ' ms')
    }

    add(e: MyEvent) {
        this.events.add(e)
    }

    now(): number {
        return this.time
    }
}
const s = new Simulator()
for (var i = 0; i < 10; i++) {
    s.add(new RandomGeneratorEvent(i))
}
const domLog = document?.querySelector('#sam')
if (domLog) {
    domLog.innerHTML = "Running..."
}
s.run()
const logLines = output.slice(0, 200).concat([output[output.length - 1]])
if (domLog) {
    domLog.innerHTML = logLines.join("<br/>")
} else {
    console.log(logLines)
}