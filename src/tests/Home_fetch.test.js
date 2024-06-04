import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import Home from './Home';
import fetchCurrentLocationWeatherData from '../screens/Home';

jest.mock('./fetchCurrentLocationWeatherData');

describe('Home', () => {
  it('fetches weather data when the device is connected to the internet', async () => {
    const mockWeatherData = {
      name: 'Test City',
      weather: [{ description: 'clear sky', icon: '01d' }],
      main: { temp: 20 },
    };
    fetchCurrentLocationWeatherData.mockResolvedValue(mockWeatherData);

    const { getByText } = render(<Home />);
    await waitFor(() => expect(fetchCurrentLocationWeatherData).toHaveBeenCalled());
    expect(getByText('Test City')).toBeTruthy();
    expect(getByText('clear sky')).toBeTruthy();
    expect(getByText('20°C')).toBeTruthy();
  });
});
