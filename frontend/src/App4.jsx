import "./App4.css";
import { useState } from "react";
import img_logo from "./components/IMG/logo_img.jpeg";

const App4 = () => {
    const [additionalQty, setAdditionalQty] = useState(1);

    const incrementAdditionalQty = () => {
        setAdditionalQty((prev) => Math.max(1, prev + 1));
    };

    const decrementAdditionalQty = () => {
        setAdditionalQty((prev) => Math.max(1, prev - 1));
    };

    const onAdditionalQtyChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (Number.isNaN(value)) {
            setAdditionalQty(1);
        } else {
            setAdditionalQty(Math.max(1, value));
        }
    };
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
                <div className="image-wrap">
                    <div className="image-banner" aria-label="Altai image with ALT text">
                        <span className="image-label">ALT</span>
                    </div>
                    <div className="image-info">
                        <div className="sub-title">Subscription</div>
                        <div className="plans">
                            <div className="plan-card">
                                <div className="plan-title">PRO</div>
                                <div className="plan-price">100 RUB</div>
                                <div className="plan-desc">unlimited DeepThink<br/>20 requests to DeeperThink</div>
                                <button className="buy-button">Buy</button>
                            </div>
                            <div className="plan-card">
                                <div className="plan-title">MAX</div>
                                <div className="plan-price">250 RUB</div>
                                <div className="plan-desc">Everything in PRO, unlimited DeeperThink</div>
                                <button className="buy-button">Buy</button>
                            </div>
                            <div className="plan-card">
                                <div className="plan-title">Additionally</div>
                                <div className="plan-price">10 RUB per request</div>
                                <div className="plan-controls">
                                    <button className="qty-btn" onClick={decrementAdditionalQty}>-</button>
                                    <input
                                        className="qty-input"
                                        type="number"
                                        min="1"
                                        value={additionalQty}
                                        onChange={onAdditionalQtyChange}
                                    />
                                    <button className="qty-btn" onClick={incrementAdditionalQty}>+</button>
                                </div>
                                <div className="plan-total">Total: {additionalQty * 10} RUB</div>
                                <button className="buy-button">Buy</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App4;