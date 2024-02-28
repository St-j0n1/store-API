import i18next from "i18next";
import styled from "styled-components";

const isEnglish = i18next.language === "en";
const FontFamily = isEnglish ? "Helvetica" : "Montserrat";

// Header Style

// For Header -->

export const HeaderBg = styled.div`
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1),
    rgba(240, 250, 250, 1),
    rgba(223, 223, 223, 0.9)
  );
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  transition: 0.3s ease;
  z-index: 999;
  padding: 0 16px;

  .MainMenu {
    display: flex;
  }

  .BurgerMenu {
    color: white;
    cursor: pointer;
    font-size: 18px;
    transition: 0.3s;
    display: none;
    
    &:hover {
        color: #0000FF;
      }
    }

  @media screen and (max-width: 767px) {
    position: absolute;
    background: transparent;

    .MainMenu {
      display: none;
    }

    .BurgerMenu {
      display: block
    }
      
    }
  }
`;

export const HeaderContent = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 15px;
  padding-bottom: 15px;
  width: 100%;
  padding: 15px 15px;

  @media screen and (max-width: 1400px) {
    padding: 15px 0;
  }

  .Logo {
    display: block;
  }

  .MediaLogo {
    display: none;
  }

  @media screen and (max-width: 1000px) {
    .logoDiv {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  @media screen and (max-width: 767px) {
    .logoDiv {
      .Logo {
        display: none;
      }

      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      .MediaLogo {
        display: block;
        width: 45px;
      }

      img {
        width: 38px;
        height: 25px;
      }
    }
  }
`;

export const Navigation = styled.nav`
  width: 380px;
  display: flex;
  align-items: center;
  gap: 40px;
  list-style: none;

  a {
    color: black;
    transition: 0.3s ease;
    font-family: ${FontFamily};
    font-weight: 700;
  }

  @media screen and (max-width: 767px) {
    width: 0;
  }
`;

export const Parameters = styled.div`
  display: flex;
  align-items: center;

  form {
    position: relative;
    margin-right: 40px;

    input {
      width: 230px;
      height: 32px;
      border-radius: 30px;
      border: 1px solid rgba(0, 0, 0, 1);
      color: rgba(0, 0, 0, 1);
      outline: none;
      padding: 5px 15px;
      background-color: transparent;
      transition: 0.3s ease;
      font-family: ${FontFamily};
      font-weight: 500;
    }

    input::placeholder {
      color: rgba(0, 0, 0, 1);
      font-family: ${FontFamily};
      font-weight: 500;
    }

    .formBtn {
      background: transparent;
      border: none;

      svg {
        position: absolute;
        right: 10px;
        top: 8px;
        width: 15px;
        height: 15px;
      }
    }

    @media screen and (max-width: 1000px) {
      display: none;
    }

    @media screen and (max-width: 767px) {
      display: ${({ isMainPage }) => (isMainPage ? "block" : "none")};
      position: absolute;
      top: 70px;
      left: 50%;
      width: 100%;
      padding: 0 16px;
      transform: translate(-50%, -50%);

      input {
        border: 1px solid white;
        color: white;
        width: 100%;
        width: 100%;

        &::placeholder {
          color: white;
        }
      }

      .formBtn {
        svg {
          font-size: 16px;
          color: white;
          right: 50px;
        }
      }
    }
  }

  div {
    display: flex;
    gap: 20px;

    button {
      padding: 2px;
      border-radius: 6px;
      border: 2px solid rgba(0, 0, 0, 1);
      color: var(--text-color, black);
      background-color: transparent;
      font-family: ${FontFamily};
      font-weight: 500;
    }

    svg {
      font-size: 22px;
      width: 22px;
    }

    @media screen and (max-width: 767px) {
      gap: 10px;

      .displayed {
        display: none;
      }

      svg {
        color: white;
        font-size: 21px;
      }
    }
  }

  svg,
  button {
    color: black;
    cursor: pointer;
    transition: 0.3s;
  }
`;

export const SubmitButton = styled.button`
  padding: 10px 30px;
  font-size: 24px;
  font-family: ${FontFamily};
  font-weight: 700;
  line-height: 36px;
  color: white;
  background-color: black;
  border: 1px solid black;
  // border-radius: 6px;
  transition: 0.5s;
  cursor: pointer;

  @media screen and (max-width: 767px) {
    padding: 4px 20px;
    font-size: 20px;
    line-height: 23px;
  }

  &:hover {
    background-color: white;
    color: #0000ff;
    border: 1px solid #0000ff;
    transition: 0.5s;
  }
`;

export const SubscriptionStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0;

  h1 {
    font-family: ${FontFamily};
    font-size: 40px;
    font-weight: 300;
    line-height: 54px;
    text-transform: capitalize;
  }

  .EmailForms {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25px;

    label {
      font-family: ${FontFamily};
      margin-bottom: 15px;
      font-weight: 300;
      font-size: 21px;
      line-height: 29px;
    }

    input {
      font-family: ${FontFamily};
      font-size: 18px;
      font-weight: 500;
      line-height: 25px;
      width: 324px;
      height: 34px;
      border: 1px solid black;
      border-radius: 24px;
      padding-left: 20px;
      color: rgba(0, 0, 0, 1);
      outline: none;
      margin-bottom: 50px;
    }

    ::placeholder {
      color: rgba(180, 180, 180, 1);
    }

    button {
      padding: 10px 30px;
      // border-radius: 10px;
    }
  }

  @media screen and (max-width: 767px) {
    padding: 38px 0 40px;

    h1 {
      font-weight: 700;
      font-size: 20px;
      line-height: 23px;
    }

    form {
      label {
        font-weight: 400;
        font-size: 16px;
        line-height: 18px;
      }

      input {
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        margin-bottom: 20px;
      }
    }
  }
`;

export const LoadingDiv = styled.div`
  position: absolute;
  color: #96281b;
  top: 51px;
  right: 15px;

  svg {
    font-size: 20px;
    color: gray;
    animation: rotate 3s linear infinite;

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

export const Loading = styled.div`
  animation: rotate 3s linear infinite;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorMessage = styled.div`
  position: absolute;
  color: #96281b;
  top: 51px;
  right: 15px;

  svg {
    font-size: 20px;
  }
`;

export const FooterDiv = styled.div`
  background-color: rgba(34, 34, 34, 1);
  padding: 40px 71px;
  display: flex;
  flex-direction: column;

  .navHeader {
    display: flex;
    justify-content: space-evenly;
    align-items: start;
    padding-bottom: 78px;
    border-bottom: 1px solid rgba(255, 255, 255, 1);

    a img {
      margin-left: 160px;
    }

    .navMenu nav {
      width: 250px;
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 20px;

      a {
        font-family: ${FontFamily};
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        color: white;

        &:hover {
          color: #c2c2c2;
        }
      }
    }
  }

  .socials {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    gap: 40px;

    svg {
      font-size: 32px;
      color: white;
      transition: 0.3s;

      &:hover {
        color: #c2c2c2;
      }
    }
  }

  @media screen and (max-width: 767px) {
    padding: 10px 16px;

    .navHeader {
      flex-direction: column;
      align-items: start;
      padding-bottom: 25px;

      a img {
        margin: 14px 0 22px;
        width: 45px;
      }
    }

    .navMenu a {
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
    }

    .socials {
      margin: 25px 0 30px;
    }
  }
`;

export const ModalPopupStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  transition: 0.5s;

  @media screen and (max-width: 1000px) {
    .TabletMode {
      display: block;
    }
  }

  @media screen and (max-width: 767px) {
    .TabletMode {
      display: none;
    }
  }

  position: fixed;
  height: 550px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f3ebde;
  z-index: 5;

  .image {
    width: 477px;
    height: 100%;
    object-fit: cover;
  }

  .modal {
    width: 455px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 20px;

    form {
      text-align: center;

      .email {
        width: 320px;
        // font-family: ${FontFamily};
        font-weight: 700;
        border-radius: 23px;
        border: 2px solid rgba(0, 0, 0, 0.3);
        color: rgba(0, 0, 0, 0.8);
        background-color: transparent;
        outline: none;
        padding: 6px 0 6px 20px;
        margin-bottom: 20px;

        ::placeholder {
          color: rgba(180, 180, 180, 1);
        }
      }

      .submitBtn {
        padding: 13px 26px 13px 26px;
        border: 1px solid black;
        color: white;
        background: black;
        font-family: ${FontFamily};
        font-weight: 700;
        font-size: 23px;
        line-height: 28px;
        border-radius: 3px;
      }

      .error-message {
        top: 6px;
        left: 318px;
        width: 300px;

        svg {
          color: #d80000;
        }
      }

      .loading {
        position: absolute;
        left: 320px;
        top: 16px;
        transform: translate(-50%, -50%);

        svg {
          height: 20px;
        }
      }

      .checked svg {
        color: #14ae5c;
      }
    }

    .popup_btn {
      position: absolute;
      top: 10px;
      right: 20px;
      cursor: pointer;
    }

    .percent,
    .off {
      font-family: ${FontFamily};
      align-self: start;
      font-size: 132px;
      font-weight: 700;
      line-height: 140px;
      color: black;
    }

    .off {
      align-self: end;
    }

    .text {
      font-family: ${FontFamily};
      text-align: center;
      color: black;
      font-size: 27px;
      font-weight: 700;
      line-height: 32px;
      margin-bottom: 20px;
    }
  }

  @media screen and (max-width: 1100px) {
    height: 338px;

    .image {
      width: 250px;
    }

    .modal {
      width: 250px;
      justify-content: center;

      form {
        margin: 0;

        .error-message {
          left: 175px;
        }
        .loading {
          left: 180px;
        }

        .email {
          width: 200px;
        }

        .submitBtn {
          padding: 3px 13px;
          font-size: 16px;
          line-height: 25px;
        }
      }

      .percent,
      .off {
        font-size: 32px;
        line-height: 25px;
      }

      .text {
        font-size: 16px;
        line-height: 19px;
      }
    }
  }
`;
