import 'react-native-gesture-handler';

import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './pages/Login/login';
import Products from './pages/Products/products';
import Carrinho from './pages/Carrinho/carrinho';

const Stack = createStackNavigator();
global.totalCarrinho = 0;

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#184C78' },
          headerTintColor: 'yellow',
          headerTitleStyle: { fontWeight: 'bold' },
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login' }}
        />

        <Stack.Screen
          name="Carrinho"
          component={Carrinho}
          options={{ title: 'Meu carrinho' }}
        />

        <Stack.Screen
          name="Products"
          component={Products}
          options={{ title: 'Produtos' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
