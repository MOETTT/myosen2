import React, { useState } from 'react';
import OTPInput from '../../components/OTPInput';
import { verifyOTP } from '../../utils/otpHelper';
import styles from '../../styles/otp.module.css';

const OTPVerificationPage = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const isValid = await verifyOTP(otp);
            if (isValid) {
                setSuccess(true);
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1>OTP Verification</h1>
            <form onSubmit={handleSubmit}>
                <OTPInput value={otp} onChange={setOtp} />
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>OTP verified successfully!</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
            </form>
        </div>
    );
};

export default OTPVerificationPage;