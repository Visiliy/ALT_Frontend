import { useState } from "react";
import "./App2.css";
import img_logo from "./components/IMG/logo_img.jpeg"
import axios from "axios";
import { useEffect } from "react";

const App2 = () => {

    const [cnt1, setCnt1] = useState(false);
    const [cnt2, setCnt2] = useState(false);
    const [isBusy, setIsBusy] = useState(false);

    const toHome = () => {
        location.href = "/";
    }

    const toAccount = () => {
        location.href = "/account"
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

    const typeWriter = (element, text, speed = 50, onComplete) => {
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
            } else if (typeof onComplete === 'function') {
                onComplete();
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
                if (!isBusy) {
                    click();
                }
            }
        }
    }

    const copyToClipboard = async (text) => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                return true;
            }
        } catch {
            // fallback below
        }
        try {
            const tempTextarea = document.createElement('textarea');
            tempTextarea.value = text;
            document.body.appendChild(tempTextarea);
            tempTextarea.select();
            document.execCommand('copy');
            document.body.removeChild(tempTextarea);
            return true;
        } catch {
            return false;
        }
    };

    const click = () => {
        if (isBusy) return;
        const textareaForm = document.querySelector(".textarea-wrapper");
        const textarea = document.querySelector(".text-area");
        const content = document.querySelector(".content");
        
        if (!textarea.value.trim()) {
            return;
        }
        setIsBusy(true);
        
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
                const answer = document.createElement("p");
                answer.className = "answer";
                content.appendChild(answer);

                typeWriter(answer, response.data[0], 80, () => {
                    // Actions container under the model answer
                    const actions = document.createElement('div');
                    actions.className = 'answer-actions';

                    // Copy button
                    const copyBtn = document.createElement('button');
                    copyBtn.className = 'action-button copy-button';
                    copyBtn.textContent = 'Copy Text';
                    copyBtn.addEventListener('click', async () => {
                        const ok = await copyToClipboard(answer.innerText || '');
                        if (ok) {
                            const old = copyBtn.textContent;
                            copyBtn.textContent = 'Copied!';
                            setTimeout(() => { copyBtn.textContent = old; }, 1500);
                        }
                    });

                    // Edit button
                    const editBtn = document.createElement('button');
                    editBtn.className = 'action-button edit-button';
                    editBtn.textContent = 'Edit';
                    editBtn.addEventListener('click', () => {
                        // Persist text and navigate to edit page
                        document.cookie = `editText=${encodeURIComponent(answer.innerText || '')}; max-age=600; path=/`;
                        location.href = '/edit';
                    });

                    actions.appendChild(editBtn);
                    actions.appendChild(copyBtn);
                    content.appendChild(actions);

                    setIsBusy(false);
                    if (load && load.parentNode) {
                        load.remove();
                    }

                    content.scrollTo({ top: content.scrollHeight, behavior: 'smooth' });
                });
            })
            .catch((error) => {
                console.error("Error:", error);
                if (load && load.parentNode) {
                    load.remove();
                }
                setIsBusy(false);
            });
    }

    const readCookie = (name) => {
        const cookies = document.cookie ? document.cookie.split('; ') : [];
        for (const cookie of cookies) {
            const [key, ...rest] = cookie.split('=');
            if (key === name) {
                return decodeURIComponent(rest.join('='));
            }
        }
        return undefined;
    };

    useEffect(() => {
        const initialMessage = readCookie('messege');
        if (initialMessage) {
            const textarea = document.querySelector(".text-area");
            if (textarea) {
                textarea.value = initialMessage;
                const sendButton = document.querySelector('.inside-button');
                if (sendButton) {
                    sendButton.click();
                }
                document.cookie = 'messege=; Max-Age=0; path=/';
            }
        }
    }, []);

    return (
        <>
            <div className="right-wrapper">
                <div className="logo2">
                    <span className="alt" onClick={toHome}>
                        <img src={img_logo} className="logo_img"/>
                        ThinkerAI
                    </span>
                </div>
                <button className="accaunt" onClick={toAccount}>ACCOUNT</button>
                <div className="textarea-wrapper">
                    <textarea
                        className="text-area"
                        placeholder="Ask ALT to come up with an idea"
                        onKeyDown={handleKeyDown}
                    />
                    <button className="deep_think" onClick={click2}>DeepThink</button>
                    <button className="deeper_think" onClick={click3}>DeeperThink</button>
                    <button className="inside-button" onClick={click} disabled={isBusy}>→</button>
                </div>
                <div className="content">
                </div>
            </div>
        </>
    );
};

export default App2;


