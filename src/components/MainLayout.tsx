import React from 'react';
import { Layout, Menu, Avatar, Badge, Input, Button } from 'antd';
import { SearchOutlined, BellOutlined, SettingOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const { Header, Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <Layout className="min-h-screen bg-[#f5f5f5]">
      <Header className="bg-white h-16 px-6 flex items-center justify-between sticky top-0 z-[1000] border-b border-[#f0f0f0]">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-[#1677ff] rounded-md shadow-sm" />
             <Link to="/" className="text-lg font-bold text-black tracking-tighter hover:text-[#1677ff]">
               VANGUARD
             </Link>
          </div>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            style={{ border: 'none', lineHeight: '64px' }}
            className="hidden md:flex flex-1 min-w-[400px]"
            items={[
              { key: '/dashboard', label: <Link to="/dashboard">Dashboard</Link> },
              { key: '/risc', label: <Link to="/risc">Inventory Management</Link> },
              { key: '/', label: <Link to="/">User Accounts</Link> },
              { key: '/reports', label: <Link to="/reports">System Logs</Link> },
            ]}
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <Input
              prefix={<SearchOutlined className="text-black/30" />}
              placeholder="Search..."
              className="bg-white border-[#f0f0f0] text-black hover:border-[#1677ff] focus:border-[#1677ff] rounded-md w-64"
            />
          </div>
          <Badge dot offset={[-2, 2]}>
            <Button type="text" shape="circle" icon={<BellOutlined className="text-black/60" />} />
          </Badge>
          <Button type="text" shape="circle" icon={<SettingOutlined className="text-black/60" />} />
          
          <div className="flex items-center gap-3 ml-2 pl-4 border-l border-[#f0f0f0]">
            <div className="text-right hidden lg:block">
               <div className="text-sm font-semibold text-black leading-none">Alex Morgan</div>
               <div className="text-[11px] text-[#8c8c8c] mt-1">Admin Role</div>
            </div>
            <Avatar 
              className="bg-[#faad14] font-bold text-white shadow-sm"
            >
              AM
            </Avatar>
          </div>
        </div>
      </Header>
      <Content className="pt-0">
        {children}
      </Content>
    </Layout>
  );
};
