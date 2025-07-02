import { useState } from "react";
import { Grid1, Shadow, DragPoint} from './components/CircleLayer';
import { getAngle } from './utils/angleMath'
import { SinWave, CosWave } from './components/WaveLayer';
import { SinButton, CosButton } from "./components/Extras/Buttons";

//import Buttons from './extras/Buttons';


export default function App() {
    const [angle, setAngle] = useState(0);
    const { degrees, cos, sin } = getAngle(angle);
    const [mode, setMode] = useState<"sin" | "cos">("sin");

    function handleModeChange(mode: "sin" | "cos") {
        setMode(mode);
        setAngle(0); // Reset trail
    }

    return (
        <div className="main-container">
            <div className="wave-container">
                <SinButton selected={mode === "sin"} onClick={() => handleModeChange("sin")} />
                <CosButton selected={mode === "cos"} onClick={() => handleModeChange("cos")} />
            </div>
            <Grid1> 
                {/*TODO: Add in the theta inside the angle */ }
                {/*TODO: Add right angle for 90 degrees*/ }
                {/*TODO: Trailing the tan wave */ }
                
                <Shadow></Shadow> {/* outline shader, delete to see what happens */}
                <DragPoint angle={angle} setAngle={setAngle} /> {/* very important, delete to see what happens */}
            </Grid1>
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
            {mode === "sin" ? (
                <>
                    <div>sin(θ): <span style={{ color: "blue" }}>{sin.toFixed(2)}</span></div>
                    <SinWave angle={angle} />
                </>
            ) : (
                <>
                    <div>cos(θ): <span style={{ color: "red" }}>{cos.toFixed(2)}</span></div>
                    <CosWave angle={angle} />
                </>
            )}
        </div>
    )
}