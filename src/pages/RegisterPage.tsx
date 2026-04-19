import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Tag, Space, Pagination } from 'antd';
import { PlusOutlined, SearchOutlined, DownloadOutlined, FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { getStore } from '../store/demoStore';
import { EarlyWarning, Status } from '../types';

const getStatusColor = (status: Status) => {
  switch (status) {
    case 'Mitigated': return 'success';
    case 'Awaiting': return 'processing';
    case 'Requested': return 'warning';
    default: return 'default';
  }
};

const RegisterPage: React.FC = () => {
  const [data, setData] = useState<EarlyWarning[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setData(getStore());
      setLoading(false);
    }, 500);
  }, []);

  const columns = [
    {
      title: 'Document ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => (
        <Link to={`/detail/${text}`} className="font-semibold text-[#1677ff] hover:underline">
          {text}
        </Link>
      ),
    },
    {
      title: 'Submission Ref.',
      dataIndex: 'submissionRef',
      key: 'submissionRef',
    },
    {
      title: 'Submission Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Notified Date',
      dataIndex: 'notifiedDate',
      key: 'notifiedDate',
      render: (text: string) => <span className="text-[#434751]">{text}</span>,
    },
    {
      title: 'Reply Required',
      dataIndex: 'replyRequiredDate',
      key: 'replyRequiredDate',
      render: (text: string) => <span className="text-[#434751]">{text}</span>,
    },
    {
      title: 'Meeting',
      dataIndex: 'riskMeetingRequired',
      key: 'meeting',
      render: (text: string) => {
        const isRequired = !text.toLowerCase().includes('not required');
        return (
          <Tag color={isRequired ? 'blue' : 'default'} style={{ fontSize: '10px' }}>
            {isRequired ? 'Requested' : 'Not Required'}
          </Tag>
        );
      }
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (text: string) => (
        <Tag color={text === 'High' ? 'error' : 'default'} style={{ fontSize: '10px', fontWeight: 'bold' }}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Action Owner',
      dataIndex: 'actionOwner',
      key: 'actionOwner',
      render: (text: string) => (
        <Space>
          <div className="w-6 h-6 rounded-full bg-[#f0f0f0] flex items-center justify-center text-[10px] font-bold text-[rgba(0,0,0,0.65)] border border-[#d9d9d9]">
            {text[0]}
          </div>
          <span className="text-[rgba(0,0,0,0.88)]">{text}</span>
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: Status) => (
        <Tag color={getStatusColor(status)} className="rounded-full px-3 py-0.5" style={{ fontSize: '10px', fontWeight: 'bold' }}>
          {status}
        </Tag>
      ),
    },
  ];

  const filteredData = data.filter(item => 
    item.title.toLowerCase().includes(searchText.toLowerCase()) ||
    item.id.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#f5f5f5] min-h-[calc(100vh-64px)]">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded-lg border border-[#f0f0f0] shadow-sm">
          <div className="text-sm text-[rgba(0,0,0,0.45)] mb-2">Total Notices</div>
          <div className="text-2xl font-bold text-[rgba(0,0,0,0.88)]">{data.length}</div>
          <div className="text-xs text-[#389e0d] mt-1">↑ 12% from last month</div>
        </div>
        <div className="bg-white p-5 rounded-lg border border-[#f0f0f0] shadow-sm">
          <div className="text-sm text-[rgba(0,0,0,0.45)] mb-2">Pending Approval</div>
          <div className="text-2xl font-bold text-[rgba(0,0,0,0.88)]">42</div>
          <div className="text-xs text-[rgba(0,0,0,0.45)] mt-1">5 urgent requests</div>
        </div>
        <div className="bg-white p-5 rounded-lg border border-[#f0f0f0] shadow-sm">
          <div className="text-sm text-[rgba(0,0,0,0.45)] mb-2">System Health</div>
          <div className="text-2xl font-bold text-[rgba(0,0,0,0.88)]">99.9%</div>
          <div className="text-xs text-[#389e0d] mt-1">Operational</div>
        </div>
      </div>

      {/* Data Table Container */}
      <div className="bg-white rounded-lg border border-[#f0f0f0] overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#f0f0f0] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Input
              prefix={<SearchOutlined className="text-[rgba(0,0,0,0.25)]" />}
              placeholder="Search register..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              className="h-9 w-64 border-[#f0f0f0] rounded-md text-sm"
            />
            <div className="flex items-center gap-1 border-l border-[#f0f0f0] pl-4">
              <Button icon={<FilterOutlined />} type="text" className="text-[rgba(0,0,0,0.65)]">Filter</Button>
              <Button icon={<ReloadOutlined />} type="text" className="text-[#1677ff]" onClick={() => setSearchText('')}>Reset</Button>
            </div>
          </div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={() => navigate('/create')}
            className="h-9 px-4 font-semibold rounded-md"
          >
            + Create New Entry
          </Button>
        </div>

        <Table 
          columns={columns} 
          dataSource={filteredData} 
          rowKey="id"
          pagination={false}
          loading={loading}
          onRow={(record) => ({
            onClick: () => navigate(`/detail/${record.id}`),
            className: 'cursor-pointer hover:bg-[#fafafa] transition-colors'
          })}
        />
        
        {/* Custom Pagination Footer */}
        <div className="px-6 py-3 bg-[#fafafa] flex items-center justify-between border-t border-[#f0f0f0]">
          <p className="text-xs text-[rgba(0,0,0,0.45)]">Showing 1 to {filteredData.length} of {data.length} entries</p>
          <Pagination
            defaultCurrent={1}
            total={data.length}
            pageSize={10}
            size="small"
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
