import React from 'react';
import { render } from '@testing-library/react-native';
import Splash from '../src/screens/Splash';
import LinearGradient from 'react-native-linear-gradient';


describe('Splash', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Splash/>);
    const loadingText = getByText('Loading Meteo');
    expect(loadingText).toBeTruthy();
  });

  it('renders the activity indicator', () => {
    const { getByTestId } = render(<Splash />);
    const activityIndicator = getByTestId('activity-indicator');
    expect(activityIndicator).toBeTruthy();
  });
});
