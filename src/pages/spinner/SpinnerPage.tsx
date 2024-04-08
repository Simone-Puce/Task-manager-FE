import { ReactElement } from "react"
import SyncLoader from "react-spinners/SyncLoader";
import "./SpinnerPage.css"

const SpinnerPage = (): ReactElement => {

    return (
        <div className="spinner-container">
            <SyncLoader />
        </div>
    )
}

export default SpinnerPage