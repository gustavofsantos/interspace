import React from "react";
import styled from "styled-components";
import Message from "../atoms/Message";

export default props => (
    <Container>
        <Layout>
            <p>Chat component</p>
            <Message sender="Gustavo" text="teste" />
            <Message sender="Gustavo" text="teste" />
        </Layout>
    </Container>
);


const Container = styled.div`
    text-align: center;
`;

const Layout = styled.div`
    display: inline-block;
    max-width: 60rem;
    width: 100vw;
`;