import "./App2.css";
import axios from "axios";

const App2 = () => {

    const toHome = () => {
        location.href = "/";
    }

    const click = () => {
        const textareaForm = document.querySelector(".textarea-wrapper");
        const textarea = document.querySelector(".text-area");
        const content = document.querySelector(".content");
        textareaForm.classList.add("bottom");

        const question = document.createElement("p");
        question.className = "question";
        question.innerText = textarea.value;
        content.appendChild(question);
        let cnt = textarea.value;
        textarea.value = "";
        content.scrollTop = content.scrollHeight;

        const load = document.createElement("div");
        load.className = "load";
        content.appendChild(load);
        axios
            .post("http://127.0.0.1:8070/request_to_model", {
                request: cnt
            })
            .then((response) => {
                load.remove();
                const answer = document.createElement("p");
                answer.className = "answer";
                answer.innerText = response.data;
                content.appendChild(answer);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    return (
        <>
            <div className="right-wrapper">
                <div className="logo2">
                    <span className="alt" onClick={toHome}>ThinkerAI</span>
                </div>
                <button className="accaunt">ACCOUNT</button>
                <div className="textarea-wrapper">
                    <textarea
                        className="text-area"
                        placeholder="Ask ALT something about physics"
                    />
                    <button className="inside-button" onClick={click}>→</button>
                </div>
                <div className="content">
                </div>
            </div>
        </>
    );
};

export default App2;
