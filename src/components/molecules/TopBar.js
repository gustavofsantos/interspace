import React from "react";
import styled from "styled-components";
import theme from "../../theme/theme";

export default props => (
    <TopBarDiv>
        <Title>
            {props.title ? props.title : "interspace"}
        </Title>
        <Button>
            +
        </Button>
    </TopBarDiv>
);

const TopBarDiv = styled.div`
    backgroundColor: ${theme.light.background};
    color: ${theme.light.foreground};

    border-bottom: ${theme.light.backgroundDarker};
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
    z-index: 24;

    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    flex: auto;

    width: 100%;
    min-height: 64px;
    margin: 0px auto;
`;

const Title = styled.a`
    padding-left: 0.6rem;
`;

const Button = styled.span`
    padding-right: 0.6rem;
`;