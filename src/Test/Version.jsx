import React from 'react';
import Select from 'react-select';

const MySelectComponent = ({ options, defaultValue, placeholder}) => {
  const defaultOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' }
  ];

  options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  defaultValue = { value: 'vanilla', label: 'Vanilla' };

  const defaultDefaultValue = { value: 'mango', label: 'Mango' };
  const defaultPlaceholder = 'Select a flavor...';

  return (
    <Select
      options={options || defaultOptions}
      defaultValue={defaultValue || defaultDefaultValue}
      placeholder={placeholder || defaultPlaceholder}
    
    />
  );
};

export default MySelectComponent;