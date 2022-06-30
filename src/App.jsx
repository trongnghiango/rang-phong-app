import Model from "./Model";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import Maxillary from "./components/Maxillary";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

export default function App() {
    //const [file, setFile] = useState({});
    const [isFile, setIsFile] = useState(false);
    //global state
    const [state, dispatch] = useStateValue();
    const {step, steps} = state;

    const setSteps = (data) => {
        dispatch({ type: actionTypes.SET_STEPS, steps: data})
    }

    const handleClearData = () => {
        
        // for enumerable properties of shallow/plain object
        // for (var key in file) {
        //     // this check can be safely omitted in modern JS engines
        //     // if (obj.hasOwnProperty(key))
        //     delete file[key];
        // }

        //
        dispatch({ type: actionTypes.CLEAR_STEPS})
        dispatch({type: actionTypes.RESET_STEP})
        dispatch({ type: actionTypes.SET_STEP, step: -1})
    }

    const handleDrop = (acceptedFiles) => {
        setIsFile(true);
        console.log("test", acceptedFiles);
        console.log("path", acceptedFiles[0].name);
        console.log("url", URL.createObjectURL(acceptedFiles[0]));

        // kho choi qua
        //handle mang file up vao
        let temp = {}
        for (let i = 0; i < acceptedFiles.length; i++) {
            const key = getItemKey(acceptedFiles[i].name);
            
            if (key == i ) {
                temp[key] = URL.createObjectURL(acceptedFiles[i]);
            }
        }

        //isSlowly
        // acceptedFiles.forEach(file => {
        //     const key = getItemKey(file.name); 
        //     temp[key] = URL.createObjectURL(file); 
        // });
        
        //setFile(temp);
        // luu o bien global
        setSteps(temp)

    };

    //parse ten file va lay stt lam key
    function getItemKey(str) {
        const a = str.split(".")[0]
        const pieces = a.split("-")
        const last = pieces[pieces.length - 1]

        return parseInt(last);
    }

    return (
        <div className="flex flex-col h-screen bg-[#0099CC]">
            <header className="py-4 text-center shadow">
                Sticky Header and Footer with Tailwind
            </header>
            <main className="flex-1 overflow-y-auto">
                {steps && <Model data={steps} />}

                {/* view usign up model files */}
                <div className='absolute bottom-[50px] right-2'>
                {Object.keys(steps).length <= 0?
                <>
                    <h2 className="text-lg">UPLOAD</h2>
                    <Dropzone onDrop={handleDrop} className="">
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ className: "dropzone p-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer" })}>
                                <input {...getInputProps()} />
                                <p>Select files</p>
                            </div>
                        )}
                    </Dropzone>
                    </>
                    : <button className="p-2 bg-gray-200 rounded" onClick={handleClearData}>CLEAR</button>}
                </div>
            </main>
            <footer className="py-4 px-5 bg-blue-400 text-center text-white">
                <ProgressBar percent={step * 100 / (Object.keys(steps).length - 1)}>
                    {[...Array(Object.keys(steps).length)].map((val, index) =>
                        <Step key={index}>
                            {({ accomplished, index }) => (
                                <button
                                    onClick={() => dispatch({type:actionTypes.SET_STEP, step: index})}
                                    className={`indexedStep ${accomplished ? "accomplished" : null}`}
                                >
                                    {index}
                                </button>
                            )}
                        </Step>)}

                </ProgressBar>
            </footer>
        </div>
    )
}
