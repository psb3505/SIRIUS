import BLEController from "../modules/BLEController";
import TextToFormat from "./TextToFormat";
import { Alert } from 'react-native';

const SpeechAction = ({ voiceMessage, characteristic, navigation }) => {
    const bleCMD = TextToFormat(voiceMessage);
    console.log("bleCMD : ", bleCMD);

    if (bleCMD) {
        BluetoothAction(bleCMD, characteristic); 
    } else {
        // 접두사 목록 정의
        const validPrefixes = ['큐리야', '규리야', '큐리아', '규리아'];

        // 접두사 제거
        let remainingMessage = voiceMessage; // 기본적으로 원래 메시지
        const prefix = validPrefixes.find((prefix) => remainingMessage.startsWith(prefix));

        if (!prefix) {
            // 접두사가 없으면 원래 메시지 그대로 사용
            remainingMessage = voiceMessage;
        } else {
            // 접두사가 있으면 접두사를 제거한 메시지 추출
            remainingMessage = voiceMessage.slice(prefix.length).trim();
        }

        console.log("CuliAction : ", remainingMessage);
        CuliAction(remainingMessage, navigation); // 접두사 제거된 메시지 전달
    }
};

const BluetoothAction = async (command, characteristic) => {
    if (!command || !characteristic) {
        console.error('BluetoothAction Error: Missing command or characteristic.');
        Alert.alert('오류', '블루투스 장치가 연결되지 않았습니다.');
        return;
    }

    try {
        console.log(`Executing Bluetooth command: ${command}`);
        await BLEController(command, characteristic);
        console.log(`Command '${command}' sent successfully.`);
    } catch (error) {
        console.error(`Failed to send command '${command}':`, error);
        Alert.alert('오류', '블루투스 장치 연결에 실패했습니다.');
    }
};


const CuliAction = async (message, navigation) => {
    console.log("CuliAction message : ", message);
    navigation.navigate('CuliTalk', { message: message });
};

export default SpeechAction;
