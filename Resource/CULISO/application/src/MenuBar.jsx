import GetIcon from "./modules/GetIcon";
import styled from "styled-components";
import { MenuButton } from "./modules/Navigate";

// CSS
const MenuBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding: 10px 0;
  margin-bottom: 15px;
  
`;

const MenuItem = styled.div`
  margin: 0 20px; /* 아이콘 간의 간격을 유지하도록 마진 추가 */
`;

export const MenuBar = () => {
    return (
        <MenuBox>
            <MenuItem>
                <MenuButton iconName={"home-white2.png"} dFlag={false} />
            </MenuItem>
            <MenuItem>
                <MenuButton iconName={"community-white.png"} dFlag={false} />
            </MenuItem>
            <MenuItem>
                <MenuButton iconName={"robot-white.png"} dFlag={true} path={"culi"} />
            </MenuItem>
            <MenuItem>
                <MenuButton iconName={"profile-white2.png"} dFlag={true} path={"myPage"} />
            </MenuItem>
        </MenuBox>
    );
};