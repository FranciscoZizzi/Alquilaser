import React, {useState} from 'react';
import {StyledTextField} from "./StyledTextField";


const PasswordField = ({value, placeholder, supportingText, isError, onChange}:{value: string, placeholder: string, supportingText?: string, isError?: Boolean, onChange: (e : string) => void;}) => {
    const [password, setPassword] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const [actualPlaceholder, setActualPlaceholder] = useState(placeholder);
    const handleFocus = () => {
        setIsFocused(true);
        setActualPlaceholder('')
    };

    const handleBlur = () => {
        setIsFocused(false);
        //setIsFilled(value !== '');
        setActualPlaceholder(placeholder)
    };

    return (
        <div>
            <div style={{
                backgroundColor: 'white',
                color: 'black',
                borderStyle: 'solid',
                width: 'calc(100% - 0.4rem - 4px)',
                padding: '0.2rem',
                position: 'relative',
                borderWidth: '2px',
                height: 56,
                borderColor: isFocused ? '#1D4ED8' : (isError ? 'red' : '#D1D5DB'),
                borderRadius: '0.375rem',
                display: 'flex',
                alignItems: 'center',
            }}>
                <label htmlFor="password"></label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    placeholder={actualPlaceholder}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handlePasswordChange}
                    style={{
                        borderColor: 'transparent',
                        backgroundColor: 'white',
                        outline: 'none',
                        width: 'calc(100% - 1rem)',
                        fontSize: '16px',
                        margin: 0, // Add margin: 0 to remove default margin
                        padding: '0.5rem', // Adjust padding as needed
                        boxSizing: 'border-box', // Ensure padding and border are included in element's total width and height
                    }}
                />
                <button onClick={toggleShowPassword}>
                    {showPassword ? 'Hide' : 'Show'}
                </button>

                <label style={{
                    borderRadius: '0.5rem',
                    position: 'absolute',
                    left: '0.75rem',
                    top: '-0.75rem',
                    backgroundColor: '#F3F4F6',
                    padding: '0.1rem 0.2rem',
                    transition: 'all 0.25s ease',
                    opacity: (isFocused || value.length > 0) ? '100%' : '0',
                }}>
                    {placeholder}
                </label>
            </div>
            <p style={{
                marginLeft: '1rem',
                marginBottom: '4px',
                marginTop: '2px',
                color: 'black',
                opacity: isFocused ? '1' : '0',
            }}>
                {supportingText}
            </p>
        </div>
    )
}
export default PasswordField;