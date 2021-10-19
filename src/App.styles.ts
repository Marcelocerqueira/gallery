import styled from "styled-components";


export const Container = styled.div`
    background-color: #27282f;
    color: #fff;
    min-height: 100vh;
`;

export const Area = styled.div`
    margin: auto;
    max-width: 980px;
    padding:  30px 0;

`;

export const Header = styled.div`
    margin: 0;
    padding: 0;
    text-align: center;
    margin-bottom: 30px;
`;

export const Screenwarning = styled.div `
    text-align: center;

    .emoji {
        font-size: 50px;
        margin-bottom: 20px;
    }
`;

export const PhotoList = styled.div`
    display: grid;
    grid-template-columns: repest(4, 1fr);
    gap: 10px;
`;
