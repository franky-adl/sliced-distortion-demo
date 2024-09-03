import React from "react";
import styled from "styled-components";
import Header from "./components/header";
import LinkIcon from "./assets/LinkIcon";
import ThreeScene from "./threejs/scene";

const Container = styled.div`
    padding: 0px ${(props) => props.theme.sitePad};
    padding-top: ${(props) => props.theme.headerHeight};
    padding-bottom: 40px;
    width: 100%;
    height: 100%;
    @media screen and (max-width: 768px) {
        padding-top: ${(props) => props.theme.mHeaderHeight};
    }
`;

const InnerContainer = styled.div`
    max-width: ${(props) => props.theme.siteWidth};
    margin: 0px auto;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .threejs-container {
        width: 100%;
        flex: 1;
        margin-bottom: 20px;
        min-height: 0; /* Crucial for it to expand/shrink with the screen size */
        #canvas {
            position: relative;
            .rotation-progressbar {
                position: absolute;
                left: 0;
                bottom: 0;
                height: 2px;
                width: 0px;
                background-color: rgba(255, 0, 0, 0.5);
            }
        }
    }
`;

const Heading = styled.h1`
    font-size: clamp(87px, -4.7984px + 11.9374vw, 148px);
    font-weight: 500;
    line-height: 80%;
    padding-top: 32px;
    text-align: center;
    @media screen and (max-width: 768px) {
        font-size: clamp(2.375rem, -0.3272rem + 12.0098vw, 5.4375rem);
        line-height: 100%;
        margin-bottom: 8px;
    }
`;

const Caption = styled.div`
    display: flex;
    justify-content: space-between;
    .col1 {
        width: 336px;
        .medium {
            font-weight: 500;
        }
    }
    .col2 {
        width: 484px;
        button {
            cursor: pointer;
            color: white;
            width: 100%;
            border: 1px solid white;
            border-radius: 12px;
            background-color: transparent;
            display: flex;
            gap: 10px;
            justify-content: center;
            align-items: center;
            padding: 12px 10px;
        }
    }
    @media screen and (max-width: 1024px) {
        .col1,
        .col2 {
            width: 40%;
        }
    }
    @media screen and (max-width: 768px) {
        flex-direction: column;
        gap: 20px;
        .col1,
        .col2 {
            width: 100%;
        }
    }
`;

const App = () => {
    return (
        <>
            <Header />
            <Container>
                <InnerContainer>
                    <Heading className="roc-grotesk">MARCO POLO</Heading>
                    <div className="threejs-container" id="threejs-wrapper">
                        <ThreeScene />
                    </div>
                    <Caption>
                        <div className="col1">
                            <span className="medium">Urban Encroachment</span>.
                            Now on exhibit 11/8 - 16/9 at Bunkamura Gallery 8/F,
                            Shibuya Hikari, Tokyo.
                        </div>
                        <div className="col2">
                            <button>
                                PAST WORKS
                                <LinkIcon />
                            </button>
                        </div>
                    </Caption>
                </InnerContainer>
            </Container>
        </>
    );
};

export default App;
