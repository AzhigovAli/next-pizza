'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="2dae0a5fd2448eeafaa5dbed628e1401157e309b"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
