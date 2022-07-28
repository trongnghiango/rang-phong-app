import React from "react";
import Layout from "./components/layout";
import Dropzone from "react-dropzone";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import Model from "./components/model";
import { useEffect } from "react";
import ControlPanel from "./components/ControlPanel";

export default function App() {
  //global state
  const [state, dispatch] = useStateValue();
  const { step, steps, isLoading, datas } = state;


  const setSteps = (data) => {
    dispatch({ type: actionTypes.SET_STEPS, steps: data })
  }

  const setData = (data) => {
    dispatch({ type: actionTypes.SET_DATA, datas: data })
  }

  const handleClearData = () => {

    // for enumerable properties of shallow/plain object
    // for (var key in file) {
    //     // this check can be safely omitted in modern JS engines
    //     // if (obj.hasOwnProperty(key))
    //     delete file[key];
    // }

    //
    dispatch({ type: actionTypes.CLEAR_STEPS })
    dispatch({ type: actionTypes.RESET_STEP })
    dispatch({ type: actionTypes.SET_STEP, step: -1 })
    //dispatch({ type: actionTypes.LOADING_FINISHED})
  }

  const handleDrop = (acceptedFiles) => {

    console.log("test", acceptedFiles);
    console.log("path", acceptedFiles[0].name);
    console.log("url", URL.createObjectURL(acceptedFiles[0]));


    // kho choi qua
    let maxillary = {} // Ham tren
    let mandibular = {} // Ham duoi
    for (let i = 0; i < acceptedFiles.length; i++) {
      const { typeKey, step } = getItemKey(acceptedFiles[i].name);

      if (typeKey == 'Maxillary') {
        maxillary[step] = URL.createObjectURL(acceptedFiles[i]);
      }

      if (typeKey == 'Mandibular') {
        mandibular[step] = URL.createObjectURL(acceptedFiles[i]);
      }
    }

    // luu o bien global
    console.log({ maxillary })
    console.log({ mandibular })

    const length = Object.keys(maxillary).length > Object.keys(mandibular).length ? Object.keys(maxillary).length : Object.keys(mandibular).length

    //setData
    setData({ maxillary, mandibular, length })
    //setSteps(maxillary)

    //Bật cờ loading 
    dispatch({ type: actionTypes.LOADING })
    // Load datas

  }

  //parse ten file va lay stt lam key
  function getItemKey(str) {
    const a = str.split(".")[0]
    const pieces = a.split("-")
    const first = pieces[0];
    const last = pieces[pieces.length - 1]

    return { typeKey: first, step: parseInt(last) };
  }

  useEffect(() => {
    console.log({ datas })
  }, [step])

  return (
    <div className="model-container">
      <Layout>

        <Model />
        <div className="absolute top-0 w-screen flex justify-center ">
          <div className="bg-white/80 rounded">
            <ControlPanel />
          </div>
          
        </div>
        {/* view usign up model files */}
        <div className='absolute bottom-2 right-4'>
          {Object.keys(steps).length <= 0 ?
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
      </Layout>
    </div>
  );
}