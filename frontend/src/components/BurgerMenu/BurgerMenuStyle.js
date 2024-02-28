import styled, { keyframes } from "styled-components";
import i18next from "i18next";

const isEnglish = i18next.language === "en";
const FontFamily = isEnglish ? "Helvetica" : "Montserrat";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const BurgerStyle = styled.div`
  animation: ${fadeIn} 0.5s;
  position: fixed;
  top: -100px;
  right: 0;
  width: 100%;
  height: 100%;
  margin-top: 100px;
  padding: 16px 16px;
  background-color: rgba(246, 246, 246, 1);
  text-align: center;
  z-index: 1000;
  font-family: ${FontFamily}
  color: black;

  svg {
    color: black;
    &:hover {
      color: #0000FF;
    }
  }

  .BurgerHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 90px;

    .closeBtn {
      cursor: pointer;

      &:hover {
        color: #0000FF;
      }
    }
    
    svg,
    input::placeholder {
      color: black;

    &:hover {
      color: #0000FF;
    }
    }

    svg {
      font-size: 21px;
      &:hover {
        color: #0000FF;
      }
    }

    input {
      border: 1px solid black;
      color: black;
      width: 100%;
    }
    
    button svg {
      color: black;
      &:hover {
        color: #0000FF;
      }

      @media screen and (max-width: 767px) {
        right: 30px;
      }
    }

    .displayed {
      display: block;
    }
  }

  .MainMenu {
    display: flex;
    margin-bottom: 54px;

   li a {
    position: relative;
    font-weight: 400;
    font-size: 20px;
    line-height: 16px;
   }

   li a:hover::before {
    content: "";
    position: absolute;
    bottom: -10px;
    width: 100%;
    height: 2px;
    background-color: black;
   }
  
  }

  .otherNav {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 15px;

    a {
      color: black;
      font-size: 18px;
      gont-weight: 400;
      line-height: 16px;
      transition: .3s;
    }

    a:hover {
      text-decoration: underline;
      color: #0000FF;
    }

    a:nth-child(2) {
      margin-bottom: 15px;
    }
  }
`;
