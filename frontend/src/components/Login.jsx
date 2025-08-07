import { useState } from "react";
import "./UI-UX/Login.model.css";

const Login = ({ regForm }) => {
    const [flag, setFlag] = useState(true);

    const reverse1 = () => {
        setFlag(false);
    };

    const reverse2 = () => {
        setFlag(true);
    };

    let d_n1 = "";
    let d_n2 = "display_none";
    let o_c = "display_none";
    if (regForm) {
        o_c = "";
    }
    if (!flag) {
        d_n2 = "";
        d_n1 = "display_none";
    }

    return (
        <div className={`Login ${o_c}`}>
            <h2 className="text-content">Knowledge is power</h2>
            <div className={`div-input1 ${d_n1}`}>
                <input className="input class1" placeholder="Nickname"></input>
                <input className="input class2" placeholder="Password"></input>
                <h3 className="ac">
                    No account?{" "}
                    <a className="link1" onClick={reverse1}>
                        Create →
                    </a>
                </h3>
                <button className="btn-enter1 one">Enter</button>
            </div>
            <div className={`div-input2 ${d_n2}`}>
                <input className="input class3" placeholder="Nickname"></input>
                <input className="input class1" placeholder="Password"></input>
                <input className="input class2" placeholder="Email"></input>
                <h3 className="ac">
                    Have account?{" "}
                    <a className="link1" onClick={reverse2}>
                        Come in →
                    </a>
                </h3>
                <button className="btn-enter1 one">Register</button>
            </div>
        </div>
    );
};

export default Login;
