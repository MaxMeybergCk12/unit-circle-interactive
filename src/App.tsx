import React, { useState } from "react";
import { Grid1, Shadow, DragPoint} from './components/CircleLayer';
import { getAngle } from './utils/angleMath'
import { SinWave, CosWave } from './components/WaveLayer';




export default function App() {
    const [angle, setAngle] = useState(0);
    const { degrees, cos, sin } = getAngle(angle);

    return (
    <div>
        {/* Part 1: Display unit circle */}
        <Grid1>
            <Shadow></Shadow> {/* outline shader, delete to see what happens */}
            <DragPoint angle={angle} setAngle={setAngle} /> {/* very important, delete to see what happens */}
        </Grid1>

        <div>
            {/* Part 2: Sin & Cos Waves*/}
            {/* TEMPORARY VALUES */ }
            {/* TODO: Finish the Interractive */}
            {/*MORE */}
            
            θ: <span style={{ color: "black" }}>{degrees.toFixed(0)}°</span><br />
            sin(θ): <span style={{ color: "blue" }}>{sin.toFixed(2)}</span><br />
            
            
            <SinWave angle={angle} />

            cos(θ): <span style={{ color: "red" }}>{cos.toFixed(2)}</span><br />

            <CosWave angle={angle} />

            *TODOs: <br />
            <br />
            <br />
            <br />
        </div>

        {/*Wanted to add colors to keep focus*/}
        {/*Less words, more interaftives */}


    </div>)
}