
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";


export default function ControlPanel() {
  const [state, dispatch] = useStateValue();
  const { hideMaxillary, hideMandibular } = state;

  const handleBtn = () => {
    console.log('click')
    dispatch({ type: actionTypes.HIDE_MANDIBULAR })
  }
  const handleBtn2 = () => {
    console.log('click')
    dispatch({ type: actionTypes.SHOW_MANDIBULAR })
  }
  const handleHideMaxillary = () => dispatch({type:actionTypes.HIDE_MAXILLARY})
  const handleShowMaxillary = () => dispatch({type: actionTypes.SHOW_MAXILLARY})

  return (
    <ul className="px-4 py-2 flex space-x-2">
      {
        !hideMandibular ? <li className="btn btn-1 w-full h-full" onClick={handleBtn}></li>
          : <li className="btn btn-2 w-full h-full" onClick={handleBtn2}></li>
      }
      {
        !hideMaxillary ? <li className="btn btn-15 w-full h-full" onClick={handleHideMaxillary}></li>
          : <li className="btn btn-16 w-full h-full" onClick={handleShowMaxillary}></li>

      }

    </ul>
  );

}