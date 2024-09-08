import React from 'react';
import { Button, Modal } from 'antd';
function Confirm({ isModalOpen, closeModal }) {
    return (
        <Modal
            title="Loading Modal"
            footer={
                <Button type="primary" onClick={closeModal}>
                    Reload
                </Button>
            }
            visible={isModalOpen}
            onCancel={closeModal}
        >
            {/* Placeholder contents */}
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    );
}

export default Confirm;