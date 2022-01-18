import { TabBar } from 'antd-mobile';
import React from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from 'react-router-dom';
import CityList from './pages/CityList';
import Home from './pages/Home';
import News from './pages/Home/News';

import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons';
import './App.scss';

export default function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const tabBarList = [
    {
      key: '/home',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: '/citylist',
      title: '列表',
      icon: <UnorderedListOutline />,
    },
    {
      key: '/message',
      title: '资讯',
      icon: <MessageOutline />,
    },
    {
      key: '/me',
      title: '我的',
      icon: <UserOutline />,
    },
  ];

  function togglePath(path) {
    navigate(path);
  }
  return (
    <div className="App">
      <div className="app-container">
        <Routes>
          <Route path="home" element={<Home />}>
            <Route path="news" element={<News />} />
          </Route>
          <Route path="citylist" element={<CityList />} />
          <Route path="/*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
      <TabBar
        className="tab-bar"
        activeKey={pathname.slice(
          0,
          pathname.substring(1).indexOf('/') === -1
            ? pathname.length
            : pathname.substring(1).indexOf('/') + 1
        )}
        onChange={(path) => togglePath(path)}
      >
        {tabBarList.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
}
