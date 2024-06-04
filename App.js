import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './components/Welcome';
import Main from './components/Main';
import Lock from './components/Lock';
import { ThemeProvider } from './components/ThemeContext';
import PrivacyPolicy from './components/Privacy';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Lock" component={Lock} />
          <Stack.Screen name="Privacy" component={PrivacyPolicy} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
