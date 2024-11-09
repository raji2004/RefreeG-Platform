
import React from 'react';

// Define the props type
interface FormProgressBarProps {
    currentStep?: number;
    className?: string;
    totalSteps?: number;
}

export const FormProgressBar: React.FC<FormProgressBarProps> = ({
    currentStep = 1,
    className = "",
    totalSteps = 5,
}) => {
    return (
        <div className={`flex ${className}`}>
            {[...Array(totalSteps)].map((_, index) => (
                <div
                    key={index}
                    style={{
                        flex: 1,
                        height: '10px',
                        backgroundColor: index < currentStep ? '#0070E0' : '#E6EEF8',
                        borderRadius: '5px',
                        margin: '0 5px',
                    }}
                />
            ))}
        </div>
    );
};