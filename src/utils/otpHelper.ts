export const generateRandomOTP = (length = 6) => {
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10).toString();
    }
    return otp;
};

export const validateOTPFormat = (otp) => {
    const otpRegex = /^[0-9]{6}$/;
    return otpRegex.test(otp);
};

export const verifyOTP = async (otp, userId) => {
    try {
        const response = await fetch('/api/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ otp, userId }),
        });
        return await response.json();
    } catch (error) {
        console.error('Error verifying OTP:', error);
        throw error;
    }
};