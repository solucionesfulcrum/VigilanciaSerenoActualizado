import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../../screens/splash/Splash';
import Login from '../../screens/login/Login';
import CreateAccount from '../../screens/login/CreateAccount';
import MenuPrincipal from '../../screens/main/MenuPrincipal';
import CamaraVigilancia from '../../screens/main/CamaraVigilancia';
import AddIncidence from '../../screens/main/AddIncidence'

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      >
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="MenuPrincipal"
        component={MenuPrincipal}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="AddIncidence"
        component={AddIncidence}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="CamaraVigilancia"
        component={CamaraVigilancia}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
