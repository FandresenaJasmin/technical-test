import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import './styles.css';

export default function Component() {
  const [checked, setChecked] = React.useState(true);
  const {setTheme,theme} = useContext(ThemeContext)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Oops!, doesn't work, check /challenges/06-switch-theme to solve this issue");
    setChecked(e.target.checked);
    if(checked){
      setTheme('dark')
    }else{
      setTheme('light')
    }
  };

  return (
    <div className="theme-toggle-container">
      <input className="theme-toggle" type="checkbox" checked={checked} onChange={handleChange} />
    </div>
  );
}
