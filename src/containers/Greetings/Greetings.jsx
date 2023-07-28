import React, { useState } from 'react';
import icon from '../../assets/img/icon-128.png';

const GreetingComponent = () => {
  const [name, setName] = useState('Klaus');

    return (
      <div>
        <p>Hello, {name}!</p>
        <img src={icon} alt="extension icon" />
      </div>
    );
}

export default GreetingComponent;
