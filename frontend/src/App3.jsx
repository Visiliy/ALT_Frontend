import "./App3.css";
import img_logo from "./components/IMG/logo_img.jpeg";

const App3 = () => {
    
    const toHome = () => {
        location.href = "/";
    }

    const toChat = () => {
        location.href = "/alt";
    }

    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        location.href = "/";
    }

    return (
        <>
            <div className="app3">
                <div className="logo2">
                    <span className="alt" onClick={toHome}>
                        <img src={img_logo} className="logo_img"/>
                        ThinkerAI
                    </span>
                </div>
                <button className="accaunt" onClick={toChat}>CHAT</button>
                <div className="chats-history">
                    <h2 className="chats-history-title">CHATS</h2>
                    <input
                        className="chat-search"
                        type="text"
                        placeholder="Search"
                    />
                </div>
                <div className="statistics">
                    <h2 className="information">INFORMATION</h2>
                    <div className="content2">
                        <div className="nickname-container">
                            <h2 className="NickName">NickName:</h2>
                            <h2 className="nick">Vasiliy</h2>
                        </div>
                        <div className="email-container">
                            <h2 className="EmailLabel">Email:</h2>
                            <h2 className="email">vasiliy@example.com</h2>
                        </div>
                    </div>
                    <a className="edit-link" href="#">Edit</a>
                    <button className="logout-button" onClick={logout}>Выйти</button>
                </div>
            </div>
        </>
    );
}

export default App3;