/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import RegisterPage from './pages/RegisterPage';
import DetailPage from './pages/DetailPage';
import CreatePage from './pages/CreatePage';

const THEME = {
  token: {
    colorPrimary: '#1677ff',
    colorInfo: '#1677ff',
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f5f5f5',
    colorText: 'rgba(0,0,0,0.88)',
    colorTextSecondary: 'rgba(0,0,0,0.45)',
    colorBorder: '#f0f0f0',
    borderRadius: 6,
    fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif",
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      bodyBg: '#f5f5f5',
    },
    Menu: {
      activeBarBorderWidth: 0,
      itemActiveBg: '#e6f4ff',
    },
    Table: {
      headerBg: '#fafafa',
      headerColor: 'rgba(0,0,0,0.88)',
      headerSplitColor: 'transparent',
    },
    Tabs: {
      titleFontSizeSM: 14,
      horizontalMargin: 0,
    }
  },
};

export default function App() {
  return (
    <ConfigProvider theme={THEME}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<RegisterPage />} />
            <Route path="/detail/*" element={<DetailPage />} />
            <Route path="/create" element={<CreatePage />} />
            {/* Fallbacks */}
            <Route path="*" element={<RegisterPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </ConfigProvider>
  );
}
