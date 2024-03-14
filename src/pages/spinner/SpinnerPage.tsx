import { ReactElement } from "react"
import { useNavigate } from "react-router"
import "./SpinnerPage.css"
import SyncLoader from "react-spinners/SyncLoader";

const SpinnerPage = (): ReactElement => {
    const navigate = useNavigate()

    const spinnerFunction = () => {
        setTimeout(() => {
            navigate("/board")
        }, 2500)

        return (
            <SyncLoader/>
        )
    }

    return (
        <div className="spinner-container">
            {spinnerFunction()}
        </div>
    )
}

export default SpinnerPage