import { useState } from "react";
import { Grid1, Shadow, DragPoint} from './components/CircleLayer';
import { getAngle } from './utils/angleMath'
import { SinWave, CosWave } from './components/WaveLayer';
import { SinButton, CosButton } from "./components/Extras/Buttons";

//import Buttons from './extras/Buttons';


export default function App() {
    const [angle, setAngle] = useState(0);
    const { degrees, cos, sin } = getAngle(angle);
    const [selectedGraph, setSelectedGraph] = useState<"sin" | "cos">("sin");

    return (
        
    <div>
        
        {/* Part 1: Display unit circle */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32 }}>
            <Grid1>
                <Shadow></Shadow> {/* outline shader, delete to see what happens */}
                <DragPoint angle={angle} setAngle={setAngle} /> {/* very important, delete to see what happens */}
            </Grid1>
            <div>
                <CosButton selected={selectedGraph === "cos"} onClick={() => setSelectedGraph("cos")} />
                <SinButton selected={selectedGraph === "sin"} onClick={() => setSelectedGraph("sin")} />
            </div>
        </div>

        <div>
            {/* Part 2: Sin & Cos Waves*/}
            {/* TEMPORARY VALUES */ }
            {/* TODO: Finish the Interractive */}
            {/*MORE */}
            
            θ: <span style={{ color: "orange" }}>{degrees.toFixed(0)}°</span><br />
            

            <br />
            <br />
            <br />
            <br />
        </div>

        {/* Works on cases of the Sin vs Cos graphs*/}
        {selectedGraph === "sin" && <div> 

            {/* This is the sin text & SinGraph itself*/}
            sin(θ): <span style={{ color: "blue" }}>{sin.toFixed(2)}</span><br />
            <SinWave angle={angle} />
            </div>
        }
        {selectedGraph === "cos" && <div>
            cos(θ): <span style={{ color: "red" }}>{cos.toFixed(2)}</span><br />

            <CosWave angle={angle} />
            </div>
        }

    </div>)
}