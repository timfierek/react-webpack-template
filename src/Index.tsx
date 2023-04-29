import React, { Profiler, StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './Index.scss';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <Profiler id="App" onRender={onRender}>
        <StrictMode>
            <Suspense fallback={<div>Make a loading component, dummy</div>}>
                <App/>
            </Suspense>
        </StrictMode>
    </Profiler>,
);

// the below Profiler function should be commented out before build, only used during development and testing/debugging.
function onRender(
    id: string,
    phase: string,
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number,
) {
    // Aggregate or log render timings...
    console.log(
        `==================================================
        \nid: ${id}
        \nphase: ${phase}
        \nactualDuration: ${actualDuration}
        \nbaseDuration: ${baseDuration}
        \nstartTime: ${startTime}
        \ncommitTime: ${commitTime}
        \n==================================================`,
    )
}

// reportWebVitals(console.log); (used for reportWebVitals from create react app, I deleted the file lol just google it)
