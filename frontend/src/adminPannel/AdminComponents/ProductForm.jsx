import React, { useRef, useState } from "react";
import { AdminLoginDiv } from "../../pages/AllPages";
import UploadWidget from "./UploadWidget";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ProductForm = ({
  onFormSubmit,
  name,
  description,
  price,
  color,
}) => {
  const { t } = useTranslation();
  const titleNameRef = useRef();
  const priceRef = useRef();
  const descRef = useRef();
  const colorRef = useRef();
  const [url, updateUrl] = useState();
  const [sliderImages, setSliderImages] = useState([]);
  const [, updateError] = useState();
  const [categoryInp, setCategoryInp] = useState();
  const [subCategoryInp, setSubCategoryInp] = useState();
  const navigate = useNavigate()

  const handleOnUpload = (error, result, widget) => {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    updateUrl(result?.info?.secure_url);
  };

  const handleOnMoreImagesUpload = (error, result, widget) => {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    setSliderImages((prevState) => [...prevState, result?.info?.secure_url]);
  };

  const navigation = () => {
    navigate('/admin/products')
    setTimeout(() => {
      window.location.reload()
    }, 200)
  }

  const result = "new product"
  const onSubmit = (e) => {
    e.preventDefault();

    if (url) {
      onFormSubmit(
        titleNameRef.current.value,
        priceRef.current.value,
        descRef.current.value,
        colorRef.current.value,
        categoryInp,
        subCategoryInp,
        url,
        sliderImages,
        result
      );
    } else {
      window.alert("Please choose Photo");
    }
  };

  return (
    <AdminLoginDiv>
      <form onSubmit={onSubmit}>
        <label htmlFor="TiTle">{t("Product title")}</label>
        <input
          id="TiTle"
          name="title"
          type="text"
          placeholder={t("Product title")}
          ref={titleNameRef}
          defaultValue={name}
          required
        />
        <label htmlFor="Price">{t("Product price")}</label>
        <input
          id="Price"
          name="price"
          type="text"
          placeholder={t("Product price")}
          ref={priceRef}
          defaultValue={price}
          required
        />
        <label htmlFor="Description">{t("Product description")}</label>
        <textarea
          id="Description"
          name="description"
          type="text"
          placeholder={t("Product description")}
          ref={descRef}
          defaultValue={description}
          required
        />
        <div>
          <select
            value={categoryInp}
            onChange={(e) => setCategoryInp(e.target.value)}
            name="category"
            id="cars"
            required
          >
            <option value="">{t("category")}</option>
            <option value="kids">{t("kids")}</option>
            <option value="woman">{t("woman")}</option>
          </select>
        </div>
        {categoryInp === "woman" && (
          <div>
            <select
              value={subCategoryInp}
              onChange={(e) => setSubCategoryInp(e.target.value)}
              name="sCategory"
              id="sCategory"
            >
              <option value="">{t("Sub Category")}</option>
              <option value="banquet">{t("banquet")}</option>
              <option value="wedding">{t("wedding")}</option>
            </select>
          </div>
        )}
        <label htmlFor="Colors">{t("color")}</label>
        <input
          id="Colors"
          name="color"
          type="text"
          placeholder={t("color")}
          ref={colorRef}
          defaultValue={color}
          required
        />
        <UploadWidget onUpload={handleOnUpload}>
          {({ open }) => {
            function handleOnClick(e) {
              e.preventDefault();
              open();
            }
            return <button onClick={handleOnClick}>{t("upload image")}</button>;
          }}
        </UploadWidget>
        {url && (
          <img className="UploadImage" src={url} alt="Uploaded resource" />
        )}
        <h2 style={{ textAlign: "center" }}>{t("slider text")}</h2>
        <UploadWidget onUpload={handleOnMoreImagesUpload}>
          {({ open }) => {
            function handleOnClick(e) {
              e.preventDefault();
              open();
            }
            return (
              <button onClick={handleOnClick}>
                {t("upload slider images")}
              </button>
            );
          }}
        </UploadWidget>
        <button type="submit">{t("add")}</button>
      </form>
      <button style={{ color: "black" }} onClick={navigation}>
          {t("go back")}
      </button>
    </AdminLoginDiv>
  );
};

export default ProductForm;
