import { useState } from "react";
import "./App2.css";
import img_logo from "./components/IMG/logo_img.jpeg"
import axios from "axios";

const App2 = () => {

    const [cnt1, setCnt1] = useState(false);
    const [cnt2, setCnt2] = useState(false);

    const toHome = () => {
        location.href = "/";
    }

    const click2 = () => {
        const deeper_think = document.querySelector(".deeper_think");
        const deep_think = document.querySelector(".deep_think");
        if (!cnt1) {
            deep_think.classList.add("new_design");
            if (cnt2) {
                deeper_think.classList.remove("new_design");
                setCnt2(!cnt2);
            }
        } else {
            deep_think.classList.remove("new_design");
        }
        setCnt1(!cnt1);
        
    }

    const click3 = () => {
        const deeper_think = document.querySelector(".deeper_think");
        const deep_think = document.querySelector(".deep_think");
        if (!cnt2) {
            deeper_think.classList.add("new_design");
            if (cnt1) {
                deep_think.classList.remove("new_design");
                setCnt1(!cnt1);
            }
        } else {
            deeper_think.classList.remove("new_design");
        }
        setCnt2(!cnt2);
        
    }

    const typeWriter = (element, text, speed = 50) => {
        const words = text.split(' ');
        let currentWordIndex = 0;
        
        const typeNextWord = () => {
            if (currentWordIndex < words.length) {
                if (currentWordIndex === 0) {
                    element.innerText = words[currentWordIndex];
                } else {
                    element.innerText += ' ' + words[currentWordIndex];
                }
                currentWordIndex++;
                
                const content = document.querySelector(".content");
                content.scrollTo({
                    top: content.scrollHeight,
                    behavior: 'smooth'
                });
                
                setTimeout(typeNextWord, speed);
            }
        };
        
        typeNextWord();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (e.shiftKey) {
                return;
            } else {
                e.preventDefault();
                click();
            }
        }
    }

    const click = () => {
        const textareaForm = document.querySelector(".textarea-wrapper");
        const textarea = document.querySelector(".text-area");
        const content = document.querySelector(".content");
        
        if (!textarea.value.trim()) {
            return;
        }
        
        textareaForm.classList.add("bottom");

        const question = document.createElement("p");
        question.className = "question";
        question.innerText = textarea.value;
        content.appendChild(question);
        let cnt = textarea.value;
        textarea.value = "";
        content.scrollTo({
            top: content.scrollHeight,
            behavior: 'smooth'
        });

        const load = document.createElement("div");
        load.className = "load";
        content.appendChild(load);
        content.scrollTo({
            top: content.scrollHeight,
            behavior: 'smooth'
        });
        
        axios
            .post("http://127.0.0.1:8070/request_to_model", {
                request: cnt
            })
            .then((response) => {
                load.remove();
                const answer = document.createElement("p");
                answer.className = "answer";
                content.appendChild(answer);
                
                typeWriter(answer, response.data[0], 80);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    return (
        <>
            <div className="right-wrapper">
                <div className="logo2">
                    <span className="alt" onClick={toHome}>
                        <img src={img_logo} className="logo_img"/>
                        ThinkerAI
                    </span>
                </div>
                <button className="accaunt">ACCOUNT</button>
                <div className="textarea-wrapper">
                    <textarea
                        className="text-area"
                        placeholder="Ask ALT to come up with an idea"
                        onKeyDown={handleKeyDown}
                    />
                    <button className="deep_think" onClick={click2}>DeepThink</button>
                    <button className="deeper_think" onClick={click3}>DeeperThink</button>
                    <button className="inside-button" onClick={click}>→</button>
                </div>
                <div className="content">
                </div>
            </div>
        </>
    );
};

export default App2;
