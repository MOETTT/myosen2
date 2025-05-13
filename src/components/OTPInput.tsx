import React, { useState } from 'react';

const OTPInput = ({ onChange, length = 6 }) => {
    const [otp, setOtp] = useState(Array(length).fill(''));

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]*$/.test(value) && (value.length <= 1)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            onChange(newOtp.join(''));

            if (value && index < length - 1) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    return (
        <div className="otp-input-container">
            {otp.map((digit, index) => (
                <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    maxLength={1}
                    className="otp-input"
                />
            ))}
        </div>
    );
};

export default OTPInput;