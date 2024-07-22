import React from "react";
import "./HomePage.scss";
import BannerCarousel from "./ContentHome/BannerCarousel";
import { RxVideo } from "react-icons/rx";
import { SlCreditCard } from "react-icons/sl";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { TbCoins } from "react-icons/tb";
import { MdOutlineDiscount } from "react-icons/md";
import { BiCheckShield } from "react-icons/bi";
import CategoryMenu from "./ContentHome/CategoryMenu";
import picture1 from "../../assets/picture1.png";
import picture2 from "../../assets/picture2.png";
import banner6 from "../../assets/banner6.png";
import banner7 from "../../assets/banner7.png";
import LaptopList from "./ContentHome/LaptopList";
import PCList from "./ContentHome/PCList";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="sub-header">
        <div className="sub-main">
          <ul>
            <li>
              <span>
                <MdOutlineDiscount
                  style={{
                    // color: "#303030",
                    fontSize: "21px",
                    marginRight: "5px",
                    transition: "0.3s",
                  }}
                />
              </span>
              <span>Săn Voucher GEARVN</span>
            </li>

            <li>
              <span>
                <HiOutlineClipboardDocumentList
                  style={{
                    // color: "#303030",
                    fontSize: "21px",
                    marginRight: "5px",
                    transition: "0.3s",
                  }}
                />
              </span>
              <span>Tin công nghệ</span>
            </li>

            <li>
              <span>
                <RxVideo
                  style={{
                    // color: "#303030",
                    fontSize: "21px",
                    marginRight: "5px",
                    transition: "0.3s",
                  }}
                />
              </span>
              <span>Video</span>
            </li>

            <li>
              <span>
                <SlCreditCard
                  style={{
                    // color: "#303030",
                    fontSize: "21px",
                    marginRight: "5px",
                    transition: "0.3s",
                  }}
                />
              </span>
              <span>Hướng dẫn thanh toán</span>
            </li>

            <li>
              <span>
                <TbCoins
                  style={{
                    // color: "#303030",
                    fontSize: "21px",
                    marginRight: "5px",
                    transition: "0.3s",
                  }}
                />
              </span>
              <span>Hướng dẫn trả góp</span>
            </li>

            <li>
              <span>
                <BiCheckShield
                  style={{
                    // color: "#303030",
                    fontSize: "21px",
                    marginRight: "5px",
                    transition: "0.3s",
                  }}
                />
              </span>
              <span>Tra cứu bảo hành</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="content-main">
        <div className="category-container">
          <CategoryMenu />
        </div>

        <div className="banner-container">
          <BannerCarousel />
        </div>

        <div className="ad-container">
          <img src={banner6} alt="banner6" />
          <img src={banner7} alt="banner7" />
        </div>
      </div>

      <div className="product-pc-list">
        <PCList />
      </div>

      <div className="picture-list">
        <div className="bg-img">
          <img src={picture1} alt="picture1" />
          <img src={picture2} alt="picture2" />
        </div>
      </div>

      <div className="product-laptop-list">
        <LaptopList />
      </div>
    </div>
  );
};

export default HomePage;