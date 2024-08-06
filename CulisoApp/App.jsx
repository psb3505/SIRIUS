import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
// 페이지 불러오기
import Intro from "./pages/Intro";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import Mypage from "./pages/Mypage";


const Stack = createStackNavigator();

// 헤더 스타일
const defaultHeaderOptions = {
    headerShown: true,
    headerStyle: {
        backgroundColor: 'transparent', // 배경을 투명으로 설정
        elevation: 0,
        shadowOpacity: 0,
    },
    headerTintColor: '#000',
    headerTitle: '',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
};
const mypageHeaderOptions = {
  headerShown: true,
  headerStyle: {
      backgroundColor: 'transparent', // 배경을 투명으로 설정
      elevation: 0,
      shadowOpacity: 0,
  },
  headerTintColor: '#000',
  headerTitle: 'CULISO Mypage',
};

const App = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
                <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={defaultHeaderOptions}/>
                <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} options={defaultHeaderOptions}/>
                <Stack.Screen name="Mypage" component={Mypage} options={mypageHeaderOptions}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
