import { useState } from "react";
import "./App.css";
import Warning from "./components/Warning";
import Login from "./components/Login";
import img_logo from "./components/IMG/logo_img.jpeg";

function App() {
    const [warning, setWarning] = useState(true);
    const [message, setMessage] = useState("");
    const [regForm, setRegForm] = useState(false);

    const openRegForm = () => {
        setRegForm(!regForm);
    }

    const openWarning = () => {
        const trimmed = message.trim();
        if (trimmed.length === 0) {
            return;
        }
        document.cookie = `messege=${encodeURIComponent(trimmed)}; max-age=600; path=/`;
        location.href = '/alt';
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            openWarning();
        }
    };

    const openSearchBar = () => {
        setWarning(true);
    };

    let flag = "";
    if (!warning) {
        flag = "display_none";
    }

    return (
        <>
            <div className="background-text">ALT</div>
            <header>
                <div className="logo">
                    <span className="alt">
                        <img src={img_logo} className="logo_img"/>
                        ThinkerAI
                    </span>
                </div>
                <nav>
                    <a href="#">ABOUT</a>
                    <a href="#">AUTHORS</a>
                    <a href="#">TECHNOLOGIES</a>
                </nav>
                <button className="login" onClick={openRegForm}>LOGIN</button>
            </header>
            <main>
                <Warning display_none={warning} openSearchBar={openSearchBar} />
                <Login regForm={regForm}/>
                <div className={`search-bar ${flag}`}>
                    <input
                        type="text"
                        placeholder="Ask ALT to come up with an idea"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="search-button" onClick={openWarning}>
                        →
                    </button>
                </div>
            </main>
            <footer></footer>
        </>
    );
}

export default App;
