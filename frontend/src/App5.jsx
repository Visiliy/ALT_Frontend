import { useEffect, useState } from "react";
import img_logo from "./components/IMG/logo_img.jpeg";
import "./App2.css";
import "./App5.css";

const App5 = () => {
    const [text, setText] = useState("");
    const [copied, setCopied] = useState(false);
    const [inputText, setInputText] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (e.shiftKey) return;
            e.preventDefault();
            toSend();
        }
    };

    const toSend = () => {
        const trimmed = (inputText || "").trim();
        if (!trimmed) return;
        document.cookie = `messege=${encodeURIComponent(trimmed)}; max-age=600; path=/`;
        location.href = '/alt';
    };

    useEffect(() => {
        const cookies = document.cookie ? document.cookie.split("; ") : [];
        let value = "";
        for (const cookie of cookies) {
            const [key, ...rest] = cookie.split("=");
            if (key === "editText") {
                value = decodeURIComponent(rest.join("="));
            }
        }
        setText(value);
    }, []);

    const toHome = () => {
        location.href = "/";
    };

    const toChat = () => {
        location.href = "/alt";
    };

    const copyToClipboard = async (value) => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(value);
                return true;
            }
        } catch {
            // fallback below
        }
        try {
            const temp = document.createElement("textarea");
            temp.value = value;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand("copy");
            document.body.removeChild(temp);
            return true;
        } catch {
            return false;
        }
    };

    const onCopy = async () => {
        const ok = await copyToClipboard(text || "");
        if (ok) {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    return (
        <div className="right-wrapper app5">
            <div className="logo2">
                <span className="alt" onClick={toHome}>
                    <img src={img_logo} className="logo_img"/>
                    ThinkerAI
                </span>
            </div>
            <button className="accaunt" onClick={toChat}>CHAT</button>
            <div className="content">
                <textarea
                    className="edit-textarea"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Edit text here"
                />
                <button className="edit-copy-btn" onClick={onCopy}>{copied ? "Copied!" : "Copy"}</button>
            </div>
            <div className="textarea-wrapper bottom">
                <textarea
                    className="text-area"
                    placeholder="Before ask"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="inside-button" onClick={toSend}>→</button>
            </div>
        </div>
    );
};

export default App5;


