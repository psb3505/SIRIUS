import React, { useEffect, useState } from "react";
import { GetImage } from '../modules/ImageManager';
import Background from '../modules/Background';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomButton } from "../modules/Navigator";
import { PermissionRequest } from "../modules/PermissionUtil";
import { BluetoothConnect } from "../modules/Bluetooth";

const SearchDevice = ({onPress}) => {
    return (
        <View style={styles.searchContainer}>
            <GetImage type={'SearchDevice'} width={192} height={192}/>
            <Text style={styles.text}>등록된 기기가 없으신가요 ?</Text>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>등록하기</Text>
            </TouchableOpacity>
        </View>
    )
}

const DeviceManage = () => {
    return (
        <View style={styles.searchContainer}>
            <GetImage type={'SearchDevice'} width={192} height={192}/>
            <Text style={styles.text}>등록된 기기가 있네요</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>등록하기</Text>
            </TouchableOpacity>
        </View>
    )
}

const Main = ({ navigation }) => {
    const [device, setDevice] = useState(null);

    const BluetoothHandler = async () => {
        const result = await BluetoothConnect();
        setDevice(result);
        console.log(device);
    }
    useEffect(()=>{
        PermissionRequest();
    }, [])

    return (
        <Background center={true}>
            {device === null ?
                <SearchDevice onPress={()=>BluetoothHandler()}/>
                :
                <DeviceManage/>
            }
            
            <BottomButton navigation={navigation}/>
        </Background>
    );
};
const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: '#ffffff',
        paddingLeft: 60,
        paddingRight: 60,
        paddingBottom: 30,
        paddingTop: 30,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 16,
        fontFamily: 'KCC-Hanbit',
        textAlign: 'center',
    },
    button: {
        width: 150,
        height: 35,
        backgroundColor: '#B1DBFA',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'Sejong hospital Bold',
        color: '#ffffff',
    }
});

export default Main;