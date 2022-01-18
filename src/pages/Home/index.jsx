import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Swiper } from 'antd-mobile';
import './index.scss';
import { getHomeSwiper, getRentGroups } from '../../api/Home/home';

export default function Home() {
  const [swiperList, setSwiperList] = useState([]);
  // console.log(swiperList);
  const navList = [
    { id: 1, imgSrc: require('../../assets/img/Home/整租.png'), name: '整租' },
    { id: 2, imgSrc: require('../../assets/img/Home/合租.png'), name: '合租' },
    {
      id: 3,
      imgSrc: require('../../assets/img/Home/地图找房.png'),
      name: '地图找房',
    },
    {
      id: 4,
      imgSrc: require('../../assets/img/Home/出租.png'),
      name: '去出租',
    },
  ];
  const [rentGroupList, setRentGroupList] = useState([]);
  async function getSwiper() {
    const { body: swiperList } = await getHomeSwiper();
    setSwiperList(swiperList);
  }
  async function getGroups() {
    const area = 'AREA|88cff55c-aaa4-e2e0';
    const { body: rentGroupList } = await getRentGroups({ area });
    console.log(rentGroupList);
    setRentGroupList(rentGroupList);
  }

  useEffect(() => {
    getSwiper();
    getGroups();
    console.log('useEffect');
  }, []);

  // 渲染轮播图
  function renderSwiper() {
    return swiperList.map((item) => (
      <Swiper.Item key={item.id}>
        <div className="swiper-item">
          <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
        </div>
      </Swiper.Item>
    ));
  }
  // 渲染导航菜单
  function renderNavBar() {
    return (
      <div className="nav-bar">
        {navList.map((item) => (
          <div className="nav-bar-item" key={item.id}>
            <img src={item.imgSrc} alt="" />
            <div className="item-name">{item.name}</div>
          </div>
        ))}
      </div>
    );
  }
  // 渲染租房小组
  function renderGroups() {
    return (
      <div className="rent-group">
        <div className="rent-group-top">
          <div className="title">租房小组</div>
          <div className="more">更多</div>
        </div>
        <div className="rent-group-content">
          {rentGroupList.map((item) => (
            <div className="rent-group-item" key={item.id}>
              <div className="left">
                <div className="title">{item.title}</div>
                <div className="desc">{item.desc}</div>
              </div>
              <div className="right">
                <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <Swiper loop autoplay>
        {renderSwiper()}
      </Swiper>
      {renderNavBar()}
      {renderGroups()}
      <Outlet />
    </div>
  );
}
