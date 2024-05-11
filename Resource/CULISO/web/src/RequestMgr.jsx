import React from "react";
import "./admin.css";
import { useNavigate } from "react-router-dom";
import { GetIcon } from "./GetIcon";

export const RequestMgr = () => {
    const navigate = useNavigate();

    function goToPage(name) {
        let url = "/" + name;
        navigate(url);
    }

    return (
        <div className="AdminMain">
            <div className="main-overlap-wrapper">
                <div className="main-overlap">
                    <div className="adminMgrList">
                        <ul>
                            <li>
                                <img className="mgrImg" alt="Help call" src={GetIcon("profile-gray.png")} />
                                <div className="mgrText"><span className="selectMgrText" onClick={()=> goToPage("")}>회원 관리</span></div>
                            </li>
                            <li>
                                <img className="mgrImg" alt="Iot" src={GetIcon("text.png")} />
                                <div className="mgrText"><span className="selectMgrText" onClick={()=> goToPage("boardMgr")}>게시판 관리</span></div>
                            </li>
                            <li>
                                <img className="mgrImg" alt="Text" src={GetIcon("iot.png")} />
                                <div className="mgrText"><span className="selectMgrText" onClick={()=> goToPage("deviceMgr")}>기기 관리</span></div>
                            </li>
                            <li>    
                                <img className="mgrImg" alt="User" src={GetIcon("help-call.png")} />
                                <div className="mgrText"><span className="selectMgrText" onClick={()=> goToPage("requestMgr")}>요청 관리</span></div>
                                <img className="selectArrow" alt="Polygon" src={GetIcon("Polygon1.png")} />
                            </li>
                        </ul>
                    </div>

                    <div className="topDiv" />
                    <div className="topDivText">admin Msg</div>
                    
                    <div className="contents" />
                    
                    <div className="selectMenuTitle">요청 관리</div>
                    
                    <div className="serchInput">
                        <img className="serchInputImage" alt="Image" src={GetIcon("serchUser.png")} />
                        <input className="serchText" type="text" placeholder="회원명" />
                    </div>
                    <button className="serchBtn">검색</button>

                    <div className="requestStateDiv">
                        <span className="requestNotComplete">요청 미완료</span>
                        <span className="requestComplete">요청 완료</span>
                    </div>
                    
                    <div className="userListBox" >
                        <table className="userListTable">
                            <thead>
                                <tr>
                                <th className="checkBox"><input type="checkbox" /></th>
                                <th>번호</th>
                                <th>아이디</th>
                                <th>닉네임</th>
                                <th>재목</th>
                                <th>상태</th>
                                <th>요청시간</th>
                                <th>상세보기</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td className="checkBox"><input type="checkbox" /></td>
                                <td>1</td>
                                <td>test1</td>
                                <td>에어컨좋아용</td>
                                <td>기기 등록 요청합니다.</td>
                                <td>미완료</td>
                                <td>2024.04.29 10:10</td>
                                <td className="mgr">
                                    <button className="mgrModifyBtn">
                                        <span className="mgrModify">상세보기</span>
                                    </button>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <button className="deleteButton">삭제</button>

                    {/* 페이징 버튼 */}
                    <div className="rectangle-12" />
                    <div className="rectangle-13" />
                    <div className="rectangle-14" />
                    <div className="rectangle-15" />
                    <div className="rectangle-16" />
                    <div className="rectangle-17" />
                    <div className="text-wrapper-36">1</div>
                    <div className="text-wrapper-37">2</div>
                    <div className="text-wrapper-38">&lt;&lt;</div>
                    <div className="text-wrapper-39">&gt;</div>
                    <div className="text-wrapper-40">&lt;</div>
                    <div className="text-wrapper-41">&gt;&gt;</div>
                    
                </div>
            </div>
        </div>
    );
};