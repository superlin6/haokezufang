import React from "react";
import { Outlet } from "react-router-dom";
import { Swiper } from "antd-mobile";
import "./index.scss";

const swiperData = [{ id: 1 }, { id: 2 }, { id: 3 }];

export default function Home() {
  return (
    <div className="home">
      <Swiper loop autoplay>
        {swiperData.map((item) => (
            <Swiper.Item key={item.id}>
                <div className="swiper-item" style={{backgroundColor: 'skyblue',height: '120px'}}>
                    {item.id}
                </div>
            </Swiper.Item>
        ))}
      </Swiper>
      <Outlet />
    </div>
  );
}
