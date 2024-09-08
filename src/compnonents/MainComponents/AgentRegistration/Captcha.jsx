import React, { useState } from 'react';
import { Input, Button } from 'antd';

const Captcha = ({ onValidate }) => {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [input, setInput] = useState('');

  function generateCaptcha() {
    return Math.random().toString(36).substring(2, 8);
  }

  function handleGenerate() {
    const newCaptcha = generateCaptcha();
    setCaptcha(newCaptcha);
    setInput('');
    onValidate(false);
  }

  function handleChange(e) {
    setInput(e.target.value);
    onValidate(e.target.value === captcha);
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Input
        value={input}
        onChange={handleChange}
        style={{ width: '200px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }} // Matching input style
      />
      <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
        <span style={{
          fontSize: '16px',
          fontFamily:'Arial',
          padding:'2px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          textDecoration: 'line-through',
          background: '#fff', 
          color: 'black', 
        }}>{captcha}</span>
        <Button onClick={handleGenerate} style={{ marginLeft: '10px', background: '#fff', color: '#333', border: '1px solid #ccc' }}>Refresh</Button>
      </div>
    </div>
  );
};

export default Captcha;
