import "./App4.css";
import img_logo from "./components/IMG/logo_img.jpeg";

const App4 = () => {
    const toHome = () => {
        location.href = "/";
    }

    const toAccount = () => {
        location.href = "/account";
    }

    return (
        <>
            <div className="app4">
                <div className="logo2">
                    <span className="alt" onClick={toHome}>
                        <img src={img_logo} className="logo_img"/>
                        ThinkerAI
                    </span>
                </div>
                <button className="accaunt" onClick={toAccount}>ACCOUNT</button>
            </div>
        </>
    );
}

export default App4;