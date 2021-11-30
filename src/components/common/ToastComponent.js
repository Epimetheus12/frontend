import React from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    successToast: ({ text, closeToast }) => {
        return (
            <div className="d-flex justify-content-start align-items-center" >
                <div style={{ 'fontSize': '25px' }}>
                    <i className="fas fa-check"/>
                </div>
                <div className="ml-3">
                    <div>{text}</div>
                </div>
            </div>
        )
    },

    errorToast: ({ text, closeToast }) => {
        return (
            <div className="d-flex justify-content-start align-items-center">
                <div style={{ 'fontSize': '25px' }}>
                    <i className="fas fa-exclamation-triangle"/>
                </div>
                <div className="ml-3">
                    <div className="font-weight-bold">Error!</div>
                    <div>{text}</div>
                </div>
            </div>
        )
    },

    infoToast: ({ text, closeToast }) => {
        return (
            <div className="d-flex justify-content-start align-items-center">
                <div style={{ 'fontSize': '25px' }}>
                    <i className="fas fa-info-circle"/>
                </div>
                <div className="ml-3">
                    <div>{text}</div>
                </div>
            </div>
        )
    }
};