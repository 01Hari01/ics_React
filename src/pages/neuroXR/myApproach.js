import React, { useState, useEffect } from 'react';

function newRandomGenerator(s) {
    const mask = 0xffffffff;
    let m_w = (123456789 + s) & mask;
    let m_z = (987654321 - s) & mask;
    return function() {
        m_z = (36969 * (m_z & 65535) + (m_z >>> 16)) & mask;
        m_w = (18000 * (m_w & 65535) + (m_w >>> 16)) & mask;
        const result = ((m_z << 16) + (m_w & 65535)) >>> 0;
        return result / 4294967296;
    };
}

function MyEvent() {
    const [time] = useState(0);

    function execute() {
        throw new Error('unimplemented');
    }

    return {
        time,
        execute,
    };
}

function RandomGeneratorEvent({ time, s, setOutput }) {
    const random = newRandomGenerator(1234);

    function execute() {
        setOutput(output => [...output, `${time} RandomGeneratorEvent`]);

        const rnd = Math.floor(random() * 100);

        if (rnd < 90) {
            return;
        }

        for (let i = 0; i < rnd; i++) {
            s.add(new RandomGeneratorEvent({
                time: s.now() + random() * 1000.0,
                s,
                setOutput,
            }));
        }
    }

    return <MyEvent time={time} execute={execute} />;
}

function PendingEvents() {
    const [events, setEvents] = useState([]);

    function pop() {
        return events.pop();
    }

    function add(e) {
        setEvents(events.concat(e));
    }


    function empty() {
        return events.length === 0;
    }

    return {
        events,
        pop,
        add,
        empty,
    };
}

function Simulator({ setOutput }) {
    const [events, setEvents] = useState(new PendingEvents());
    const [time, setTime] = useState(0);

    function run() {
        const limit = 3000;
        let count = 0;
        const startTime = performance.now();
        let currentTime = time;

        while (!events.empty() && count < limit) {
            const ev = events.pop();
            if (ev.time < currentTime) {
                currentTime = ev.time;
            }
            ev.execute();
            count++;
        }

        const endTime = performance.now();

        setTime(currentTime);
        setOutput(output => [
            ...output,
            `Finished simulating ${count} events in ${endTime - startTime} ms`,
        ]);
    }

    function add(e) {
        setEvents(prevEvents => {
            prevEvents.add(e);
            return {...prevEvents}; // return a new object reference
        });
    }


    function now() {
        return time;
    }

    useEffect(() => {
        const s = { add, now };
        for (let i = 0; i < 10; i++) {
            add(new RandomGeneratorEvent({
                time: i,
                s,
                setOutput,
            }));
        }

        run();
    }, [add, setOutput]);

    return null;
}

function InterviewQuestion() {
    const [output, setOutput] = useState([]);

    return (
        <div>
            <p>Running...</p>
            <ul>
                {output.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <Simulator setOutput={setOutput}/>
        </div>
    );
}
export default InterviewQuestion