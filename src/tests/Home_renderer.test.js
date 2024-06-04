import React from 'react';
import { render } from '@testing-library/react-native';
import Home from './Home';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
}));

jest.mock('@react-native-community/geolocation', () => ({
  requestAuthorization: jest.fn(),
  getCurrentPosition: jest.fn(),
}));

describe('Home', () => {
  it('renders correctly when there is no weather data', () => {
    const { getByTestId } = render(<Home />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });
});
