import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../../screens/splash/Splash';
import Login from '../../screens/login/Login';
import CreateAccount from '../../screens/login/CreateAccount';
import MenuPrincipal from '../../screens/main/MenuPrincipal';
import CamaraVigilancia from '../../screens/main/CamaraVigilancia';
<<<<<<< HEAD
import AddIncidence from '../../screens/main/AddIncidence';
import ResumenEstadistico from '../../screens/main/ResumenEstradistico';
=======
import AddIncidence from '../../screens/main/AddIncidence'
import SolApoyo from '../../screens/main/SolApoyo'
import RegApoyo from '../../screens/main/RegApoyo'
>>>>>>> ce4cc87f81242b40b98ce692b8224f034ed88fb1

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
      <Stack.Screen
<<<<<<< HEAD
        name="ResumenEstadistico"
        component={ResumenEstadistico}
=======
        name="SolApoyo"
        component={SolApoyo}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="RegApoyo"
        component={RegApoyo}
>>>>>>> ce4cc87f81242b40b98ce692b8224f034ed88fb1
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
