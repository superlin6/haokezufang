import React, { useEffect, useState } from 'react';
import { NavBar } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import { getCityList, getHotCity } from '../../api/CityList/citylist';

//格式化数据
async function formatCityData(list) {
  const cityList = {}; //{a:[{},{}],b:[]}
  //   const cityIndex = []; //[a,b,c,d]
  const newList = await list;

  newList.forEach((city) => {
    const firstAlbum = city.pinyin.slice(0, 1);
    if (cityList[firstAlbum]) {
      cityList[firstAlbum].push(city);
    } else {
      cityList[firstAlbum] = [city];
    }
  });
  const cityIndex = Object.keys(cityList).sort();
  const { body: hot } = await getHotCity();
  cityList['hot'] = hot;
  cityIndex.unshift('hot');
  //   console.log(cityList, cityIndex);
  return {
    cityList,
    cityIndex,
  };
}

export default function CityList() {
  const [cityList, setCityList] = useState([]);
  const [cityIndex, setCityIndex] = useState([]);
  //   console.log(cityList, cityIndex);
  const navigate = useNavigate();
  function back() {
    navigate(-1);
  }
  async function getList() {
    const { body } = await getCityList({ level: 1 });
    const { cityList, cityIndex } = await formatCityData(body);
    setCityList(cityList);
    setCityIndex(cityIndex);
  }
  useEffect(() => {
    getList();
  }, []);
  // 渲染导航栏
  function renderNavBar() {
    return (
      <NavBar className="top-nav-bar" back="返回" onBack={back}>
        城市
      </NavBar>
    );
  }
  // 渲染列表
  function renderList() {
    return (
      <div className="wrapper">
          {
              cityIndex.map(index => {
                  return (
                    <div className="list-item" key={index}>
                        <div className="title">{index}</div>
                        <div className="content">
                            {
                                cityList[index].map(city => {
                                    return (
                                        <div className="city" key={city.label}>{city.label}</div>
                                    )
                                })
                            }
                        </div>
                    </div>
                  )
              })
          }
        
      </div>
    );
  }

  return (
    <div className="city-list">
      {renderNavBar()}
      {renderList()}
    </div>
  );
}
