module.exports = {
  preset: 'react-native',
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|@react-navigation|@react-native-masked-view|@react-native-safe-area-context|react-native-screens|@react-native-community/netinfo|@react-native-community/geolocation|@react-native/js-polyfills)',
  ],
};
