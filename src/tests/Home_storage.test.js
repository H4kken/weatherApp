import React from 'react';
import { render } from '@testing-library/react-native';
import Home from './Home';
import { getMeteoJson } from '../screens/Home';

jest.mock('./storage', () => ({
  getMeteoJson: jest.fn(),
}));

describe('Home', () => {
  it('fetches weather data from storage when the device is not connected to the internet', () => {
    const mockWeatherData = {
      name: 'Test City',
      weather: [{ description: 'clear sky', icon: '01d' }],
      main: { temp: 20 },
    };
    getMeteoJson.mockReturnValue(mockWeatherData);

    const { getByText } = render(<Home />);
    expect(getByText('Test City')).toBeTruthy();
    expect(getByText('clear sky')).toBeTruthy();
    expect(getByText('20°C')).toBeTruthy();
  });
  it('displays an error message when there is no weather data in storage', () => {
    getMeteoJson.mockReturnValue(null);

    const { getByText } = render(<Home />);
    expect(getByText('Cannot fetch meteo data')).toBeTruthy();
  });
});
