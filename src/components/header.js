import React, { useRef } from "react";
import styled from "styled-components";
import MenuIcon from "../assets/MenuIcon";
import CrossIcon from "../assets/CrossIcon";

const Container = styled.header`
    width: 100%;
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    height: ${(props) => props.theme.headerHeight};
    padding: 0px ${(props) => props.theme.sitePad};
    @media screen and (max-width: 768px) {
        height: ${(props) => props.theme.mHeaderHeight};
    }
`;

const InnerContainer = styled.div`
    max-width: ${(props) => props.theme.siteWidth};
    margin: 0px auto;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
`;

const MenuDiv = styled.div`
    display: none;
    cursor: pointer;
    @media screen and (max-width: 768px) {
        display: block;
    }
`;

const CrossDiv = styled.div`
    cursor: pointer;
`;

const Menu = styled.div`
    display: none;
    gap: 40px;
    @media screen and (min-width: 769px) {
        display: flex;
        gap: initial;
        width: 484px;
        justify-content: space-between;
    }
`;

const MenuFullScreen = styled.div`
    position: fixed;
    z-index: 100;
    top: 0;
    left: -100vw;
    width: 100vw;
    height: 100vh;
    padding: 0px ${(props) => props.theme.sitePad};
    background-color: ${(props) => props.theme.dark};
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
    /* pointer-events: none; */
`;

const MobileMenuTopBar = styled.div`
    width: 100%;
    height: ${(props) => props.theme.mHeaderHeight};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    & > span {
        font-weight: bold;
        font-size: 20px;
    }
`;

const MobileMenuItems = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    & > span {
        font-size: 4rem;
        /* font-style: italic; */
    }
    @media screen and (max-width: 600px) {
        & > span {
            font-size: clamp(2.5rem, 0.25rem + 10vw, 4rem);
        }
    }
`;

const BrandDiv = styled.div`
    cursor: pointer;
    a {
        font-weight: bold;
        font-size: 20px;
        text-decoration: none;
        color: white;
    }
`;

const Header = () => {
    const menuFS = useRef();

    const handleMenuToggle = () => {
        const opacity = menuFS.current.style.opacity;
        if (opacity == 0) {
            menuFS.current.style.left = 0;
            menuFS.current.style.opacity = 1;
        } else {
            menuFS.current.style.opacity = 0;
            setTimeout(() => {
                menuFS.current.style.left = "-100vw";
            }, 350);
        }
    };

    return (
        <>
            <MenuFullScreen ref={menuFS}>
                <MobileMenuTopBar>
                    <span>MP</span>
                    <CrossDiv onClick={handleMenuToggle}>
                        <CrossIcon />
                    </CrossDiv>
                </MobileMenuTopBar>
                <MobileMenuItems>
                    <span>ABOUT</span>
                    <span>PHOTOGRAPHY</span>
                    <span>CONTACT</span>
                </MobileMenuItems>
            </MenuFullScreen>
            <Container>
                <InnerContainer>
                    <BrandDiv>
                        <a href="#">MP</a>
                    </BrandDiv>
                    <MenuDiv onClick={handleMenuToggle}>
                        <MenuIcon />
                    </MenuDiv>
                    <Menu>
                        <span>ABOUT</span>
                        <span>PHOTOGRAPHY</span>
                        <span>CONTACT</span>
                    </Menu>
                </InnerContainer>
            </Container>
        </>
    );
};

export default Header;
