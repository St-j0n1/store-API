import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../AdminContexts/AdminAuthContext";
import { useEffect, useState } from "react";
import { AdminLoginDiv } from "../../pages/AllPages";
import Logo from "../../assets/MA.png";
import { useTranslation } from "react-i18next";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, authenticated } = useAdminAuth();
  const validUserName = process.env.REACT_APP_ADMIN_USERNAME;
  const validPassword = process.env.REACT_APP_ADMIN_PASSWORD;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === validUserName && password === validPassword) {
      login();
      navigate("products");
    } else {
      setError("Invalid user or password");
    }
  };

  useEffect(() => {
    authenticated && navigate("/admin/products");
  }, [authenticated, navigate]);

  return (
    <AdminLoginDiv>
      <a style={{ marginBottom: "40px" }} href="/">
        <img src={Logo} alt="Logo" />
      </a>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label htmlFor="adminName">{t("user")}</label>
          <input
            id="adminName"
            name="adminName"
            type="text"
            placeholder={t("user")}
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="adminPassword">{t("Password")}</label>
          <input
            id="adminPassword"
            name="adminPassword"
            type="password"
            placeholder={t("Password")}
            autoComplete="off"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">{t("Log in")}</button>
      </form>
      <button className="goBack" onClick={() => navigate("/")}>
        <a style={{ color: "black" }} href="/">
          {t("go back")}
        </a>
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </AdminLoginDiv>
  );
};

export default AdminLogin;
