import Model from "./Model";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { useState } from "react";
import Dropzone from "react-dropzone";
import Maxillary from "./components/Maxillary";

export default function App() {
    const [step, setStep] = useState(0);
    const [file, setFile] = useState();
    const [isFile, setIsFile] = useState(false);
    const handleDrop = (acceptedFiles) => {
        setIsFile(true);
        console.log("test", acceptedFiles);
        console.log("path", acceptedFiles[0].path);
        console.log("url", URL.createObjectURL(acceptedFiles[0]));
        // setFile(URL.createObjectURL(acceptedFiles[0]));

        // kho choi qua
        //handle mang file up vao
        let temp = {}
        for (let i = 0; i < acceptedFiles.length; i++) {
            const key = getItemKey(acceptedFiles[i].path);
            temp[key] = URL.createObjectURL(acceptedFiles[i]);
        }
        console.log({temp})
        console.log("Length", Object.keys(temp).length)
        setFile(temp);
    };

    //parse ten file va lay stt lam key
    function getItemKey(str) {
        const a = str.split(".")[0]
        const pieces = a.split("-")
        const last = pieces[pieces.length - 1]

        return parseInt(last);
    }

    const handleStep = (s) => {
        console.log({ step })
        setStep(s)
    }
    return (
        <div className="flex flex-col h-screen bg-[#0099CC]">
            <header className="py-4 text-center shadow">
                Sticky Header and Footer with Tailwind
            </header>
            <main className="flex-1 overflow-y-auto">
                {file && <Model onStep={handleStep} stepInput={step} data={file} />}

                {/* view usign up model files */}
                <div className='absolute bottom-[50px] right-2'>
                    <h2 className="text-lg">UPLOAD</h2>
                    <Dropzone onDrop={handleDrop} className="">
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ className: "dropzone p-2 bg-gray-200 rounded" })}>
                                <input {...getInputProps()} />
                                <p>Drag'n'drop files, or click to select files</p>
                            </div>
                        )}
                    </Dropzone>
                </div>
            </main>
            <footer className="py-4 px-5 bg-blue-400 text-center text-white">
                <ProgressBar percent={step * 100 / 27.0}>
                    {[...Array(28)].map((val, index) =>
                        <Step key={index}>
                            {({ accomplished, index }) => (
                                <button
                                    onClick={() => setStep(index)}
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
