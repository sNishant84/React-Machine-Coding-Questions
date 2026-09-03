import React, { useState, useRef, useEffect } from 'react';

const CustomSelect = ({ options, placeholder = 'Select...' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const wrapperRef = useRef(null);

  const toggleOption = (option) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((item) => item !== option));
    } else {
      setSelected([...selected, option]);
    }
  };

  const handleRemove = (option) => {
    setSelected(selected.filter((item) => item !== option));
  };

  const handleClickOutside = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="custom-select-wrapper" ref={wrapperRef}>
      <div className="custom-select-control" onClick={() => setIsOpen(!isOpen)}>
        <div className="tags">
          {selected.map((item) => (
            <div key={item.value} className="tag">
              {item.label}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(item);
                }}
              >
                ×
              </button>
            </div>
          ))}
          {selected.length === 0 && (
            <span className="placeholder">{placeholder}</span>
          )}
        </div>
        <span className="dropdown-arrow">▾</span>
      </div>

      {isOpen && (
        <ul className="custom-select-options">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => toggleOption(opt)}
              className={selected.includes(opt) ? 'selected' : ''}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
