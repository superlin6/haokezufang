import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Swiper, SearchBar, Button } from 'antd-mobile';
import { SearchOutline } from 'antd-mobile-icons';
import './index.scss';
import {
  getHomeSwiper,
  getRecentNews,
  getRentGroups,
} from '../../api/Home/home';

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
  const [newsList, setnewsList] = useState([]);
  async function getSwiper() {
    const { body: swiperList } = await getHomeSwiper();
    setSwiperList(swiperList);
  }
  async function getGroups() {
    const area = 'AREA|88cff55c-aaa4-e2e0';
    const { body: rentGroupList } = await getRentGroups({ area });
    // console.log(rentGroupList);
    setRentGroupList(rentGroupList);
  }
  async function getNews() {
    const area = 'AREA|88cff55c-aaa4-e2e0';
    const { body: newsList } = await getRecentNews({ area });
    setnewsList(newsList);
  }

  useEffect(() => {
    getSwiper();
    getGroups();
    getNews();
    console.log('useEffect');
  }, []);

  // 渲染轮播图
  function renderSwiper() {
    return (
      <Swiper loop autoplay>
        {swiperList.map((item) => (
          <Swiper.Item key={item.id}>
            <div className="swiper-item">
              <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
            </div>
          </Swiper.Item>
        ))}
      </Swiper>
    );
  }
  // 渲染搜索框
  function renderSearchBar() {
    return (
      <div className="search-bar">
        <div className="search">
          <SearchBar
            placeholder="请输入内容"
            style={{ '--background': '#ffffff' }}
          ></SearchBar>
        </div>
        <Button className="search-btn">
          <div className="btn-content">
            <span>搜索</span>
          </div>
        </Button>
      </div>
    );
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
  // 渲染最新资讯
  function renderNews() {
    return (
      <div className="news">
        <div className="title">最新资讯</div>
        <div className="content">
          {newsList.map((item) => (
            <div className="news-item" key={item.id}>
              <div className="left">
                <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
              </div>
              <div className="right">
                <div className="title">{item.title}</div>
                <div className="bottom">
                  <div className="left">{item.from}</div>
                  <div className="right">{item.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      {renderSwiper()}
      {renderSearchBar()}
      {renderNavBar()}
      {renderGroups()}
      {renderNews()}
      <Outlet />
    </div>
  );
}
