import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { GetImage } from '../modules/ImageManager';
import Background from '../modules/Background';
import axios from 'axios';

const Header = () => {
    return (
        <View style={styles.loginTitleContiner}>
            <Text style={styles.loginTitle}>집 안의 모든 기기를 보다 쉽고,</Text>
            <Text style={styles.loginTitle}>간편하게 관리하기 !</Text>
            <Text style={styles.loginTitle}>지금 큐리소 계정으로 로그인하세요.</Text>
        </View>
    );
}

const Input = ({ iconType, secureText, placeholder, setFunc }) => {
  return (
    <View style={styles.inputContainer}>
      <GetImage type={iconType} width={22} height={22} marginLeft={20} marginRight={15} />
      <TextInput style={styles.inputText} secureTextEntry={secureText} placeholder={placeholder} onChangeText={text=>setFunc(text)}/>
    </View>
  );
};

const Login = ({ navigation }) => {
    const [user_id, setUserID] = useState();
    const [user_pw, setUserPW] = useState();
    
    const LoginHandler = () => {
        console.log(`아이디: ${user_id}`);
        console.log(`비번: ${user_pw}`);

        const data = { user_id, user_pw };
        //http://10.0.2.2:8080/user/login
        axios.post('http://192.168.25.4:8080/user/login', data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        })
        .then((response) => {
            console.log(response.data);
            if(response.data){
                navigation.navigate('Main');
            }
            else{
                Alert.alert('로그인 실패', '아이디/비밀번호를 확인해 주세요.', [
                      {text: '확인', onPress: () => console.log('alert closed')},
                ]);
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <Background center={true}>
            <View style={styles.loginContainer}>
                <Text style={styles.header}>CULISO<Text style={styles.subHeader}> Account</Text></Text>
                <View style={styles.login}>
                    <Header/>
                    <Input iconType={'LoginID'} secureText={false} placeholder="아이디" setFunc={setUserID}/>
                    <Input iconType={'LoginPW'} secureText={true} placeholder="비밀번호" setFunc={setUserPW}/>
                    <TouchableOpacity style={styles.button} onPress={LoginHandler}><Text style={styles.buttonText}>로그인</Text></TouchableOpacity>
                </View>
            </View>
        </Background>
    );
};


const styles = StyleSheet.create({
    loginContainer: {
        width: 331,
    },
    header: {
        fontFamily: 'KCC-Hanbit',
        color: '#605FC2',
        fontSize: 20,
    },
    subHeader: {
        fontFamily: 'KCC-Hanbit',
        color: '#6982C8',
        fontSize: 15,
    },
    login: {
        width: "100%",
        backgroundColor: '#FFFFFF',
        height: 427,
        marginTop: 12,
        borderRadius: 15,
        alignItems: 'center',
    },
    loginTitleContiner: {
        width: "100%",
        marginTop: 25,
    },
    loginTitle: {
        width: "100%",
        textAlign: 'center',
        fontFamily: 'LINESeedKR-Bd',
        letterSpacing: 1.5
    },
    inputContainer: {
        width: 285,
        height: 47,
        borderRadius: 6,
        backgroundColor: '#EAE8E8',
        marginTop: 25,
        alignItems: 'center',
        flexDirection: 'row',
    },
    inputText: {
        color: '#939393',
        fontFamily: 'KCC-Hanbit',
        textAlign: 'left',
    },
    button: {
        backgroundColor: '#b1dbfa',
        width: 285,
        height: 44,
        borderRadius: 10,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#474747',
        fontSize: 16,
        fontFamily: 'Sejong hospital Bold',
    },
});

export default Login;