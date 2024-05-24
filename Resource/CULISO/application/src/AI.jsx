import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Cookies } from "react-cookie";
import './App.css';
import GetIcon from './modules/GetIcon';
import { GetChatLog } from './modules/DataRouter';
import { BackButton } from "./modules/Navigate";
const cookies = new Cookies();

export function AI() {
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const [listening, setListening] = useState(false);
    const [typingMessage, setTypingMessage] = useState('입력 중');
    const typingIntervalRef = useRef(null);
    const recognitionRef = useRef(null);

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
        alert('이 브라우저는 음성 인식을 지원하지 않습니다. 구글 크롬을 사용해주세요.');
        }
    }, []);

    useEffect(() => {
        return () => {
            if (typingIntervalRef.current) {
                clearInterval(typingIntervalRef.current);
            }
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);
    useEffect(() => {
        const chatLogElement = document.querySelector('.chat-log');
        chatLogElement.scrollTop = chatLogElement.scrollHeight;

        let didCancel = false;

        const fetchChatLog = async () => {
        try {
            const data = await GetChatLog();
            console.log(data);
            if (!didCancel) {
                for(let i = 0; i < data.length; i++){
                    updateChatLog({ sender: data[i].senderType === 'U' ? 'user' : 'bot', text: data[i].userChatContext });
                }
            }
        } catch (error) {
            if (!didCancel) {
                console.error('Failed to fetch chat log:', error);
            }
        }
        };

        fetchChatLog();

        return () => {
            didCancel = true;
        };
    }, []);
    const startListening = () => {
        if (!('webkitSpeechRecognition' in window)) return;
    
        const recognition = new window.webkitSpeechRecognition();
        recognitionRef.current = recognition;
        recognition.lang = 'ko-KR';
        recognition.continuous = false;
        recognition.interimResults = false;
    
        recognition.onstart = () => {
            setListening(true);
            startListeningIndicator();
        };
    
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setMessage(transcript);
            updateChatLog({ sender: 'user', text: transcript });
            getLocationAndSendMessage(transcript);
            setListening(false);
            stopListeningIndicator();
        };
    
        recognition.onerror = (event) => {
            console.error('음성 인식 오류:', event.error);
            setListening(false);
            stopListeningIndicator();
        };
    
        recognition.onend = () => {
            setListening(false);
            stopListeningIndicator();
        };
    
        recognition.start();
    };
    const stopListening = () => {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
          recognitionRef.current = null;
        }
      };
      const getLocationAndSendMessage = (transcript) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              sendMessageWithLocation(transcript, latitude, longitude);
            },
            (error) => {
              console.error('위치 정보를 가져오는 중 오류 발생:', error);
              sendMessage(transcript, false);
            },
            { timeout: 10000, enableHighAccuracy: true } // 타임아웃 및 고정밀도 설정
          );
        } else {
          console.error('이 브라우저는 위치 정보를 지원하지 않습니다.');
          sendMessage(transcript, false);
        }
      };

    const sendMessageWithLocation = async (msg, latitude, longitude) => {
        if (!msg.trim()) return;

        updateChatLog({ sender: 'user', text: msg });

        try {
        startTypingIndicator();

        const token = cookies.get("token");

        if (!token) {
            console.log("토큰 없음");
            return false; // 토큰이 없을 때 false 반환
        }

        const response = await axios.post('http://localhost:5000/chat', { message: msg, latitude, longitude }, {headers : {"Authorization": `Bearer ${token}`}});
        stopTypingIndicator();
        handleBotResponse(response.data.response);
        } catch (error) {
        stopTypingIndicator();
        console.error('위치 정보를 포함하여 메시지를 보내는 중 오류 발생:', error);
        alert('위치 정보를 포함하여 메시지를 보내는 중 오류가 발생했습니다.');
        }
    };

    const sendMessage = async (msg, isVoice = false) => {
        if (!msg.trim()) return;
        if (!isVoice) {
            updateChatLog({ sender: 'user', text: msg });
        }

        try {
            startTypingIndicator();


            const token = cookies.get("token");

            if (!token) {
                console.log("토큰 없음");
                return false; // 토큰이 없을 때 false 반환
            }

        

            const response = await axios.post('http://localhost:5000/chat', { message: msg }, {headers : {"Authorization": `Bearer ${token}`}});
            stopTypingIndicator();
            handleBotResponse(response.data.response);
        } catch (error) {
            stopTypingIndicator();
            console.error('메시지를 보내는 중 오류 발생:', error);
            alert('메시지를 보내는 중 오류가 발생했습니다.');
        }
    };

    const handleBotResponse = (response) => {
        const cleanedResponse = response.replace(/\*\*|###|####/g, ''); // '**'와 '###' 제거
        updateChatLog({ sender: 'bot', text: cleanedResponse });
    };

    const updateChatLog = (message) => {
        setChatLog((prevChatLog) => [...prevChatLog, message]);
        setMessage('');
    };

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            getLocationAndSendMessage(message);
        }
    };

    const formatMessage = (text) => {
        return text.split('\n').map((line, index) => {
        if (line.startsWith('  ')) { // 들여쓰기 적용할 부분 감지
            return <div key={index} className="formatted-line indented">{line}</div>;
        }
        return <div key={index} className="formatted-line">{line}</div>;
        });
    };

    const startTypingIndicator = () => {
        setTypingMessage('입력 중');
        typingIntervalRef.current = setInterval(() => {
        setTypingMessage(prev => prev.length < 9 ? prev + '.' : '입력 중');
        }, 500);

        updateChatLog({ sender: 'bot', text: '입력 중' });
    };

    const stopTypingIndicator = () => {
        if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
        }

        // Remove the typing indicator
        setChatLog((prevChatLog) => prevChatLog.filter((message, index) => index !== prevChatLog.length - 1));
    };
    const startListeningIndicator = () => {
        updateChatLog({ sender: 'bot', text: '음성 인식 중' });
    };
    
    const stopListeningIndicator = () => {
        setChatLog((prevChatLog) => prevChatLog.filter((message) => message.text !== '음성 인식 중'));
    };
    return (
        <div className="ai">
            <div className='aiDiv'>
                <div className="App">
                    <div className='topMenubar'>
                        <BackButton left="20px"/>
                        <span style={{marginLeft: "10px"}}>큐리소</span>
                    </div>
                    <div className="chat-log">
                        <div>
                            {chatLog.map((entry, index) => (
                            <div>
                                {entry.sender === 'bot' && 
                                <div className="culiBox">
                                    <img className="culi" src={GetIcon("robot-white.png")} alt="bot" />
                                    <div><span>큐리</span></div>
                                </div>}
                                <div className={`chat-box ${entry.sender}`}>
                                    <div key={index} className={`chat-message ${entry.sender}`}>
                                        {entry.sender === 'bot' && entry.text === '입력 중' ? typingMessage : formatMessage(entry.text)}
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                    <div className="chat-input">
                    <input
                        type="text"
                        value={message}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="메시지를 입력하세요.."
                    />
                    <img src={GetIcon("send-blue.png")} width="30px"onClick={getLocationAndSendMessage} alt=''/>
                    {listening ? 
                    '듣는 중...': 
                    <img src={GetIcon("voice-blue.png")} width="30px" alt='' onMouseDown={startListening} onMouseUp={stopListening} disabled={listening}/>}
                    </div>
                </div>
            </div>
        </div>
    );
}