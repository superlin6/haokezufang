import React, { Suspense, useEffect, useState, useRef } from 'react';
import { NavBar, SpinLoading, Toast } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
// import { List } from 'react-virtualized';
import './index.scss';
import { getCityList, getHotCity } from '../../api/CityList/citylist';
import { getCurrentCity, setCurrentCity } from '../../utils/index';

//格式化数据
async function formatCityData(list) {
  const cityList = {}; //{a:[{},{}],b:[]}
  //   const cityIndex = []; //[a,b,c,d]
  const newList = await list;

  newList.forEach((city) => {
    const firstAlbum = city.pinyin.slice(0, 1).toUpperCase();
    if (cityList[firstAlbum]) {
      cityList[firstAlbum].push(city);
    } else {
      cityList[firstAlbum] = [city];
    }
  });
  const cityIndex = Object.keys(cityList).sort();
  const { body: hot } = await getHotCity();
  cityList['hot'] = hot;
  // console.log(hot);
  cityList['#'] = [
    {
      label: getCurrentCity(),
    },
  ];
  cityIndex.unshift('hot');
  cityIndex.unshift('#');
  // console.log(cityList, cityIndex);
  return {
    cityList,
    cityIndex,
  };
}

export default function CityList() {
  // const [loading, setLoading] = useState(true);
  const [cityList, setCityList] = useState([]);
  const [cityIndex, setCityIndex] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  // 获取当前位置
  const [curCity, setCurCity] = useState('');
  const cityListRef = useRef(null);
  const listRef = useRef(null);
  //   console.log(cityList, cityIndex);
  const navigate = useNavigate();
  function back() {
    navigate(-1);
  }
  async function getList() {
    const { body } = await getCityList({ level: 1 });
    const { cityList, cityIndex } = await formatCityData(body);
    setCurCity(getCurrentCity());
    setCityList(cityList);
    setCityIndex(cityIndex);
  }
  function changeCity(city) {
    setCurrentCity(city);
    setCurCity(city);
    Toast.show({
      content: '修改成功',
      maskClickable: false,
      duration: 600,
      afterClose: () => {
        navigate('/home');
      },
    });
  }
  function handleScroll(e) {
    console.log('scroll', e.target.scrollTop);
    let node = listRef.current.childNodes[activeIndex]; // 对应字母的列表item
    if (e.target.scrollTop > node.offsetTop) {
      //当滚动条大于当前item activeIndex需要进行切换
      setActiveIndex(activeIndex + 1);
      // console.log(node.offsetTop);
    } else {
      //当往回滚动时 不能直接-1 要判断
      //else 已经是<=acticeIndex时的判断了 再次判断<=activeIndex-1
      if (
        activeIndex>=1 &&
        e.target.scrollTop <=
        listRef.current.childNodes[activeIndex - 1].offsetTop
      )
        setActiveIndex(activeIndex >= 1 ? activeIndex - 1 : 0);
    }
    // console.log(listRef.current.childNodes[activeIndex].offsetTop);
  }
  function scrollToIndex(index) {
    // console.log(listRef.current.childNodes[0].offsetTop);
    cityListRef.current.scrollTop = listRef.current.childNodes[index].offsetTop - 45;
    setActiveIndex(index);
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
      <div className="wrapper" ref={listRef}>
        {cityIndex.map((index) => {
          return (
            <div className="list-item" key={index}>
              <div className="title">
                {index === 'hot'
                  ? '热门城市'
                  : index === '#'
                  ? '当前定位'
                  : index}
              </div>
              <div className="content">
                {cityList[index].map((city) => {
                  if (index === '#') {
                    return (
                      <div className="city" key={city.label}>
                        {curCity}
                      </div>
                    );
                  }
                  return (
                    <div
                      className="city"
                      key={city.label}
                      onClick={() => changeCity(city.label)}
                    >
                      {city.label}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  // 渲染右侧索引列表
  function renderIndex() {
    return (
      <div className="city-index">
        {cityIndex.map((item, index) => (
          <div
            className="index-item"
            key={item}
            onClick={() => scrollToIndex(index)}
          >
            <div className={activeIndex === index ? 'index-active' : ''}>
              {item === 'hot' ? '热' : item}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="city-list" ref={cityListRef} onScroll={handleScroll}>
      {renderNavBar()}
      {renderList()}
      {renderIndex()}
    </div>
  );
}
