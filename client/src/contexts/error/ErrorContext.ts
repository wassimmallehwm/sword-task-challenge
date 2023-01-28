import React from 'react';
import { ErrorData } from '@shared/types';

export interface ErrorContextInterface {
  error: ErrorData | null;
  setError: (errorData: ErrorData | null) => void;
}

export const ErrorContextDefaults: ErrorContextInterface = {
  error: null,
  setError: (errorData: ErrorData | null) => null
};

export const ErrorContext = React.createContext<ErrorContextInterface>(
  ErrorContextDefaults
);