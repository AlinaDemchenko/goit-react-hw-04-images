import { ColorRing } from 'react-loader-spinner';
import styled from 'styled-components';

export const StyledNotification = styled.div`
position: absolute;
z-index: 1200;
display: flex;
align-items: center;
justify-content: center;
gap: 12px;
top: 80px;
right: -40px;
min-width: 160px;
padding: 0 20px;
height: 60px;
text-align: center;
background-color: #66a884;
opacity: 0.6;
color: #fff;
transform: translateX(-100px);
transition: all 0.3s ease-in-out;

p{
    display: block;
}

span {
    display: block;
    border: 1px solid #fff;
    border-radius: 50%;
    width: 20px;
    height: 20px;
}
`;