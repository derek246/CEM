import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useBlocker } from 'react-router-dom';
import { 
  Button, Space, Tabs, Tag, Input, Checkbox, 
  Table, Timeline, Avatar, Divider, Empty, 
  Select, Tooltip, message, Modal, DatePicker
} from 'antd';
import { 
  ArrowLeftOutlined, LeftOutlined, RightOutlined, 
  MinusOutlined, PlusOutlined, FullscreenOutlined, 
  DownloadOutlined, PrinterOutlined, EditOutlined,
  HistoryOutlined, CheckCircleOutlined, UsergroupAddOutlined,
  CalendarOutlined, FilePdfOutlined, FileImageOutlined,
  EyeOutlined, DeleteOutlined, UploadOutlined,
  InfoCircleOutlined,
  CheckOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { getStore, updateWarning, deleteWarning } from '../store/demoStore';
import { EarlyWarning, ApprovalStep, ActivityLogEntry, ExternalReviewer } from '../types';
import dayjs from 'dayjs';

const { TextArea } = Input;

const DetailPage: React.FC = () => {
  const params = useParams();
  const id = params['*'];
  const navigate = useNavigate();
  const [data, setData] = useState<EarlyWarning | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewFile, setPreviewFile] = useState<{name: string, type: string} | null>(null);
  
  // Activity Log Filters & Sorting
  const [activitySearch, setActivitySearch] = useState('');
  const [activitySearchField, setActivitySearchField] = useState<'all' | 'user' | 'details'>('all');
  const [activitySortOrder, setActivitySortOrder] = useState<'asc' | 'desc'>('desc');

  // Navigation blocking for unsaved changes
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isEditMode && currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    if (isEditMode) {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = '';
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [isEditMode]);

  useEffect(() => {
    if (blocker.state === 'blocked') {
      Modal.confirm({
        title: 'Unsaved Changes',
        content: 'You have unsaved changes. Are you sure you want to leave this page?',
        okText: 'Leave',
        cancelText: 'Stay',
        onOk: () => blocker.proceed(),
        onCancel: () => blocker.reset(),
      });
    }
  }, [blocker]);

  useEffect(() => {
    const store = getStore();
    const item = store.find(w => w.id === id);
    if (item) {
      setData(item);
    }
  }, [id]);

  if (!data) return <div className="p-20 text-center"><Empty description="Notice not found" /></div>;

  const handleSave = () => {
    if (data) {
      updateWarning(data);
      setIsEditMode(false);
      message.success('Changes saved successfully');
    }
  };

  const handlePreview = (file: { name: string, type: string }) => {
    setPreviewFile(file);
    setPreviewVisible(true);
  };

  const processedActivities = (data?.activityLog || [])
    .filter(log => {
      if (!activitySearch) return true;
      const term = activitySearch.toLowerCase();
      if (activitySearchField === 'user') return log.user.toLowerCase().includes(term);
      if (activitySearchField === 'details') return log.details?.toLowerCase().includes(term);
      return log.user.toLowerCase().includes(term) || (log.details?.toLowerCase().includes(term) ?? false);
    })
    .sort((a, b) => {
      const dateA = dayjs(a.date).valueOf();
      const dateB = dayjs(b.date).valueOf();
      return activitySortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  const PDF_TOOLBAR = (
    <div className="px-4 py-2 bg-[#fafafa] border-b border-[#f0f0f0] flex justify-between items-center shrink-0">
      <Space size="large">
        <Space size="middle">
          <LeftOutlined className="cursor-pointer hover:text-[#1677ff] text-xs" />
          <span className="text-[10px] font-bold text-[rgba(0,0,0,0.45)] uppercase tracking-widest">Page 1 of 4</span>
          <RightOutlined className="cursor-pointer hover:text-[#1677ff] text-xs" />
        </Space>
        <Space className="border-l border-[#f0f0f0] pl-4">
          <MinusOutlined className="cursor-pointer hover:text-[#1677ff]" />
          <span className="text-xs font-bold w-16 text-center">Automatic</span>
          <PlusOutlined className="cursor-pointer hover:text-[#1677ff]" />
        </Space>
      </Space>
      <Space size="middle">
        <FullscreenOutlined className="cursor-pointer hover:text-[#1677ff] p-1" />
        <DownloadOutlined className="cursor-pointer hover:text-[#1677ff] p-1" />
        <PrinterOutlined className="cursor-pointer hover:text-[#1677ff] p-1" />
      </Space>
    </div>
  );

  const PDF_MOCK = (
    <div className="flex-1 bg-[#f0f2f5] p-8 overflow-y-auto flex flex-col items-center gap-8 no-scrollbar">
      <div className="w-[595px] bg-white shadow-lg border border-[#f0f0f0] p-12 min-h-[842px] relative shrink-0 rounded-sm">
        <div className="border border-[#f0f0f0] p-8 h-full flex flex-col">
          <div className="flex justify-between items-start mb-12">
            <div className="bg-[#1677ff] text-white p-3 font-bold text-xl uppercase rounded-sm">EWN</div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-[rgba(0,0,0,0.88)] tracking-tight m-0">EARLY WARNING NOTICE</h2>
              <p className="text-[rgba(0,0,0,0.45)] text-[10px] mt-1 m-0">Form ref: 2413/EDMS/EWN</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="h-4 bg-slate-100 w-3/4 rounded"></div>
            <div className="h-4 bg-slate-100 w-1/2 rounded"></div>
            <div className="h-4 bg-slate-100 w-full rounded"></div>
            
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="h-24 bg-slate-50 border border-slate-100 rounded p-4 flex flex-col gap-2">
                 <div className="h-2 bg-slate-200 w-1/2 rounded"></div>
                 <div className="h-3 bg-slate-300 w-full rounded"></div>
              </div>
              <div className="h-24 bg-slate-50 border border-slate-100 rounded p-4 flex flex-col gap-2">
                 <div className="h-2 bg-slate-200 w-1/2 rounded"></div>
                 <div className="h-3 bg-slate-300 w-full rounded"></div>
              </div>
            </div>

            <div className="h-64 bg-slate-50 border border-dashed border-slate-200 rounded flex items-center justify-center">
              <p className="text-slate-300 text-sm font-medium italic">Document Content Preview</p>
            </div>
          </div>

          <div className="mt-auto pt-8 text-[10px] text-slate-400 uppercase tracking-widest border-t border-slate-100 flex justify-between">
            <span>Confidential Infrastructure Document</span>
            <span>Project Alpha • Sub 0042</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      {/* Sub-Header */}
      <div className="bg-white px-8 py-4 flex flex-col gap-4 shadow-sm border-b border-[#f0f0f0] shrink-0">
        <div className="flex justify-between items-center">
          <Space separator={<RightOutlined className="text-[10px] text-[rgba(0,0,0,0.25)]" />} className="text-sm font-medium">
            <span className="text-[rgba(0,0,0,0.45)] hover:text-[#1677ff] cursor-pointer">Early Warnings</span>
            <span className="text-[rgba(0,0,0,0.88)] font-semibold">Project Manager Early Warnings</span>
          </Space>
          <Space size="middle">
            <Button 
              type="text" 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/')}
              className="font-semibold text-[#1677ff] hover:bg-[#e6f4ff]"
            >
              Back to Register
            </Button>
            <Divider orientation="vertical" className="h-6 mx-2" />
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              onClick={() => {
                Modal.confirm({
                  title: 'Delete Early Warning',
                  content: `Are you sure you want to delete ${data.id}? This action cannot be undone.`,
                  okText: 'Delete',
                  okType: 'danger',
                  cancelText: 'Cancel',
                  onOk: () => {
                    deleteWarning(data.id);
                    message.success('Notice deleted successfully');
                    setIsEditMode(false);
                    navigate('/');
                  }
                });
              }}
              className="font-semibold"
            >
              Delete
            </Button>
            <Button className="font-semibold">Meeting Detail</Button>
            <Button className="font-semibold">View Relations</Button>
          </Space>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: PDF Viewer */}
        <div className="w-1/2 flex flex-col border-r border-[#f0f0f0]">
          {PDF_TOOLBAR}
          {PDF_MOCK}
        </div>

        {/* Right Side: Tabbed Interface */}
        <div className="w-1/2 bg-white overflow-hidden flex flex-col">
          <Tabs 
            activeKey={activeTab}
            onChange={setActiveTab}
            className="pl-16 pr-8 pt-4 shrink-0"
            items={[
              { key: 'general', label: 'General Information' },
              { key: 'approval', label: 'Approval Progress' },
              { key: 'response', label: 'Response' },
              { key: 'activities', label: 'Activities' },
            ]}
          />

          <div className="flex-1 overflow-y-auto pl-16 pr-12 py-6 no-scrollbar">
            {activeTab === 'general' && (
              <div className="space-y-8 pb-12">
                <div className="flex items-center justify-between">
                  <Space align="center" size={12}>
                    <div className="w-1 h-5 bg-[#1677ff] rounded-full" />
                    <h3 className="text-lg font-semibold text-[rgba(0,0,0,0.88)] m-0">General Information</h3>
                  </Space>
                  <Button 
                    type={isEditMode ? 'primary' : 'default'} 
                    onClick={() => isEditMode ? handleSave() : setIsEditMode(true)}
                    className={!isEditMode ? 'text-[#1677ff] border-[#1677ff] font-semibold' : ''}
                    size="small"
                  >
                    {isEditMode ? 'SAVE' : 'EDIT'}
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-[12px] font-semibold text-[rgba(0,0,0,0.45)] mb-2">Submission Title</label>
                    <Input 
                      disabled={!isEditMode} 
                      value={data.title}
                      onChange={e => setData({...data, title: e.target.value})}
                      className="h-10 border-[#f0f0f0] rounded-md" 
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[rgba(0,0,0,0.45)] mb-2">Version</label>
                    <Input disabled={!isEditMode} value={data.version} className="h-10 border-[#f0f0f0] rounded-md" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[rgba(0,0,0,0.45)] mb-2">Submission Type</label>
                    <Select 
                      disabled={!isEditMode} 
                      value={data.type} 
                      className="w-full h-10"
                      options={[{ value: 'Early Warning Notice', label: 'Early Warning Notice' }]}
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[rgba(0,0,0,0.45)] mb-2">Submission Ref No</label>
                    <Input disabled={!isEditMode} value={data.submissionRef} className="h-10 border-[#f0f0f0] rounded-md" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[rgba(0,0,0,0.45)] mb-2">Date Became Aware</label>
                    <DatePicker 
                      disabled={!isEditMode} 
                      value={data.dateAware ? dayjs(data.dateAware) : null} 
                      onChange={(date) => setData({...data, dateAware: date ? date.format('YYYY-MM-DD') : ''})}
                      className="w-full h-10 border-[#f0f0f0] rounded-md" 
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[12px] font-semibold text-[rgba(0,0,0,0.45)] mb-2">Notice Given By / Responsible Party</label>
                    <div className="flex border border-[#d9d9d9] rounded-sm overflow-hidden h-10 max-w-[400px]">
                      <button 
                        onClick={() => isEditMode && setData({...data, noticeGivenBy: 'Main Contractor'})}
                        className={`flex-1 px-4 text-xs font-bold transition-colors ${data.noticeGivenBy === 'Main Contractor' ? 'bg-[#003a8c] text-white' : 'bg-[#f5f5f5] text-[rgba(0,0,0,0.45)] hover:bg-[#d9d9d9]'}`}
                      >
                        Main Contractor
                      </button>
                      <button 
                        onClick={() => isEditMode && setData({...data, noticeGivenBy: 'PM'})}
                        className={`flex-1 px-4 text-xs font-bold transition-colors ${data.noticeGivenBy === 'PM' ? 'bg-[#003a8c] text-white' : 'bg-[#f5f5f5] text-[rgba(0,0,0,0.45)] hover:bg-[#d9d9d9]'}`}
                      >
                        PM
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[rgba(0,0,0,0.45)] mb-4">Early Warning Category</label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      'Increasing Total Price', 'Delaying Completion',
                      'Delaying meeting a Key Date', 'Impairing performance'
                    ].map(cat => (
                      <Checkbox 
                        key={cat} 
                        disabled={!isEditMode} 
                        checked={data.categories.includes(cat)}
                        className="p-3 border border-[#f0f0f0] rounded-md hover:bg-[#fafafa] transition-all m-0"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setData({...data, categories: [...data.categories, cat]});
                          } else {
                            setData({...data, categories: data.categories.filter(c => c !== cat)});
                          }
                        }}
                      >
                        <span className="text-sm font-medium text-[rgba(0,0,0,0.88)]">{cat}</span>
                      </Checkbox>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-[12px] font-semibold text-[rgba(0,0,0,0.45)]">Description</label>
                  </div>
                  <div className="rounded-md border border-[#f0f0f0] overflow-hidden shadow-sm">
                    <div className="bg-[#fafafa] p-2 flex items-center gap-1 border-b border-[#f0f0f0]">
                      <Space size={4}>
                        <Button size="small" type="text" className="font-bold">B</Button>
                        <Button size="small" type="text" className="italic">I</Button>
                        <Button size="small" type="text" className="underline">U</Button>
                        <Divider orientation="vertical" />
                        <span className="text-[10px] font-semibold px-2 py-0.5 bg-white rounded border border-[#f0f0f0]">style</span>
                      </Space>
                    </div>
                    <TextArea 
                      disabled={!isEditMode} 
                      value={data.description} 
                      onChange={e => setData({...data, description: e.target.value})}
                      autoSize={{ minRows: 4 }}
                      className="border-none focus:ring-0 p-4"
                    />
                  </div>
                </div>

                {/* Risk Management Section */}
                <div className="space-y-6 pt-8 border-t border-[#f0f0f0]">
                  <div className="flex justify-between items-center">
                    <Space align="center" size={12}>
                      <div className="w-1 h-5 bg-[#1677ff] rounded-full" />
                      <h3 className="text-lg font-semibold text-[rgba(0,0,0,0.88)] m-0">Risk Management</h3>
                    </Space>
                    <Button 
                      onClick={() => isEditMode ? handleSave() : setIsEditMode(true)}
                      size="small"
                      className="text-[#1677ff] border-[#1677ff] font-semibold uppercase px-4"
                    >
                      {isEditMode ? 'SAVE' : 'EDIT'}
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-[12px] font-semibold text-[rgba(0,0,0,0.45)] mb-2">Early Warning Meeting Required?</label>
                      <Select 
                        disabled={!isEditMode}
                        value={data.riskMeetingRequired}
                        onChange={val => setData({...data, riskMeetingRequired: val})}
                        className="w-full h-12 rounded-md"
                        options={[
                          { value: 'To be discussed at next scheduled early warning meeting', label: 'To be discussed at next scheduled early warning meeting' },
                          { value: 'Immediate meeting required', label: 'Immediate meeting required' }
                        ]}
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold text-[rgba(0,0,0,0.45)] mb-2">Schedule Meeting</label>
                      <DatePicker 
                        disabled={!isEditMode}
                        value={data.meetingDate ? dayjs(data.meetingDate) : null}
                        onChange={(date) => setData({...data, meetingDate: date ? date.format('YYYY-MM-DD') : ''})}
                        className="w-full h-10 border-[#f0f0f0] rounded-md"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <label className="block text-[12px] font-semibold text-[rgba(0,0,0,0.45)] mb-2">Likelihood</label>
                        <Select 
                          disabled={!isEditMode}
                          value={data.likelihood}
                          onChange={val => setData({...data, likelihood: val})}
                          className="w-full h-10 border-[#f0f0f0] rounded-md"
                          options={['Low', 'Medium', 'High'].map(v => ({ value: v, label: v }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] font-semibold text-[rgba(0,0,0,0.45)] mb-2">Severity</label>
                        <Select 
                          disabled={!isEditMode}
                          value={data.severity}
                          onChange={val => setData({...data, severity: val})}
                          className="w-full h-10 border-[#f0f0f0] rounded-md"
                          options={['Minor', 'Moderate', 'High', 'Critical'].map(v => ({ value: v, label: v }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] font-semibold text-[rgba(0,0,0,0.45)] mb-2">Priority</label>
                        <Select 
                          disabled={!isEditMode}
                          value={data.priority}
                          onChange={val => setData({...data, priority: val})}
                          className="w-full h-10 border-[#f0f0f0] rounded-md"
                          options={['Low', 'Medium', 'High', 'Urgent'].map(v => ({ value: v, label: v }))}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold text-[rgba(0,0,0,0.45)] mb-2">Custom Fields: Risk Classification PM</label>
                      <Select
                        mode="tags"
                        disabled={!isEditMode}
                        value={data.tags}
                        onChange={tags => setData({...data, tags})}
                        className="w-full risk-classification-select"
                        placeholder="Add tags..."
                        tagRender={(props) => {
                          const { label, closable, onClose } = props;
                          return (
                            <Tag
                              closable={closable}
                              onClose={onClose}
                              className="bg-[#002d50] text-white border-none rounded-full px-4 py-0.5 flex items-center gap-1 font-semibold text-xs h-6 mr-2"
                            >
                              {label}
                            </Tag>
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* File List */}
                <div className="space-y-4 pt-6 border-t border-[#f0f0f0]">
                  <div className="flex justify-between items-center">
                    <Space align="center">
                      <div className="w-1 h-5 bg-[#1677ff] rounded-full" />
                      <h3 className="text-lg font-semibold text-[rgba(0,0,0,0.88)] m-0">File List</h3>
                    </Space>
                    <Space>
                      <Button size="small" icon={<DownloadOutlined />} className="text-[11px] font-bold text-[#1677ff] border-[#1677ff] px-3">DOWNLOAD ALL</Button>
                      <Button size="small" icon={<UploadOutlined />} type="text" />
                    </Space>
                  </div>

                  <div className="bg-white rounded-md overflow-hidden shadow-sm border border-[#f0f0f0]">
                    <Table 
                      size="small"
                      pagination={false}
                      className="text-xs"
                      columns={[
                        { 
                          title: 'FILE NAME', 
                          dataIndex: 'name', 
                          render: (text, record) => (
                            <Space>
                              {record.type === 'pdf' ? <FilePdfOutlined className="text-[#1677ff]" /> : <FileImageOutlined className="text-red-500" />}
                              <span className="font-medium">{text}</span>
                            </Space>
                          )
                        },
                        { 
                          title: 'MERGE INTO PDF', 
                          dataIndex: 'included',
                          render: (included) => (
                            <Tag color={included ? 'green' : 'default'} style={{ fontSize: '10px' }}>
                              {included ? 'INCLUDED' : 'EXCLUDED'}
                            </Tag>
                          )
                        },
                        { title: 'TYPE', dataIndex: 'type', render: t => t.toUpperCase() },
                        { 
                          title: 'REMARK', 
                          dataIndex: 'uploadedBy',
                          render: (user, record) => (
                            <div className="text-[10px] text-[rgba(0,0,0,0.45)] leading-tight">
                              {record.size} by {user} on<br/>{record.date}
                            </div>
                          )
                        },
                        { 
                          key: 'actions', 
                          align: 'right',
                          render: (_, record) => (
                            <Space>
                              <Button 
                                size="small" 
                                type="text" 
                                icon={<EyeOutlined />} 
                                onClick={() => handlePreview(record)}
                              />
                              <Button size="small" type="text" icon={<DownloadOutlined />} />
                              <Button size="small" type="text" icon={<DeleteOutlined />} danger style={{ color: '#ff4d4f' }} />
                            </Space>
                          )
                        }
                      ]}
                      dataSource={data.files}
                      rowKey="name"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'approval' && (
              <div className="pb-12 text-[rgba(0,0,0,0.88)]">
                <h2 className="text-lg font-semibold text-[rgba(0,0,0,0.88)] mb-8 flex items-center gap-2">
                  <UsergroupAddOutlined /> Internal Approval Progress
                </h2>
                
                <Timeline
                   className="ml-4"
                   items={data.approvalProgress.map((step, idx) => ({
                    color: step.status === 'Waiting for Approval' ? 'blue' : 'green',
                    dot: step.status === 'Waiting for Approval' ? <div className="w-3 h-3 bg-[#1677ff] rounded-full border-2 border-white shadow-sm" /> : <CheckCircleOutlined className="text-[#52c41a] bg-white" />,
                    children: (
                      <div className={`p-4 rounded-md border mb-4 ${step.status === 'Waiting for Approval' ? 'bg-white border-[#1677ff] shadow-sm ring-1 ring-[#1677ff]/10' : 'bg-[#fafafa] border-[#f0f0f0]'}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className={`text-[11px] uppercase tracking-wider font-semibold mb-1 ${step.status === 'Waiting for Approval' ? 'text-[#1677ff]' : 'text-[rgba(0,0,0,0.45)]'}`}>
                              {step.role}
                            </p>
                            <h3 className="font-bold text-[rgba(0,0,0,0.88)] m-0">{step.user}</h3>
                          </div>
                          <Tag 
                            color={step.status === 'Waiting for Approval' ? 'processing' : 'success'} 
                            style={{ borderRadius: 4, fontSize: 10, fontWeight: '600' }}
                          >
                            {step.status}
                          </Tag>
                        </div>
                        <p className={`text-xs mt-2 m-0 ${step.status === 'Waiting for Approval' ? 'italic text-[rgba(0,0,0,0.45)]' : 'text-[rgba(0,0,0,0.45)]'}`}>
                          {step.status === 'Waiting for Approval' ? `Assigned since ${step.date}` : step.date}
                        </p>
                      </div>
                    )
                   }))}
                />

                <h2 className="text-lg font-semibold text-[rgba(0,0,0,0.88)] mt-12 mb-6 flex items-center gap-2">
                  <UsergroupAddOutlined /> External Reviewer's Progress
                </h2>
                
                <div className="bg-[#fafafa] rounded-md overflow-hidden border border-[#f0f0f0]">
                  <Table 
                    size="small"
                    pagination={false}
                    columns={[
                      { 
                        title: 'REVIEWER', 
                        dataIndex: 'user',
                        render: (text) => (
                           <Space>
                             <Avatar size="small" className="bg-[#1677ff] text-[10px] font-bold">{text.split(' ').map(n=>n[0]).join('')}</Avatar>
                             <span className="font-semibold">{text}</span>
                           </Space>
                        )
                      },
                      { title: 'ROLE', dataIndex: 'role' },
                      { title: 'LAST OPENED', dataIndex: 'lastOpened' },
                      { 
                        title: 'STATUS', 
                        dataIndex: 'status',
                        render: (text) => (
                          <Tag color={text === 'Approve' ? 'success' : 'default'} style={{ padding: '0 8px', fontSize: 10, fontWeight: '600' }}>
                            {text}
                          </Tag>
                        )
                      }
                    ]}
                    dataSource={data.externalReviewers}
                    rowKey="user"
                    className="approval-table"
                  />
                </div>
              </div>
            )}

            {activeTab === 'activities' && (
              <div className="pb-12 max-w-2xl mx-auto">
                <header className="mb-10 flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-bold text-[rgba(0,0,0,0.88)] m-0">Activity Log</h3>
                    <p className="text-sm text-[rgba(0,0,0,0.45)] mt-1">Audit trail for {data.id}</p>
                  </div>
                  <Button type="link" icon={<HistoryOutlined />} className="text-[#1677ff] font-semibold text-sm">View History</Button>
                </header>

                <div className="mb-8 flex flex-wrap gap-3 items-center bg-white p-3 rounded-md border border-[#f0f0f0] shadow-sm">
                  <div className="flex-1 min-w-[200px]">
                    <Input 
                      placeholder="Search activities..." 
                      prefix={<SearchOutlined className="text-[rgba(0,0,0,0.25)]" />}
                      value={activitySearch}
                      onChange={e => setActivitySearch(e.target.value)}
                      className="h-9 border-[#f0f0f0] rounded-sm"
                      allowClear
                    />
                  </div>
                  <Select 
                    value={activitySearchField}
                    onChange={setActivitySearchField}
                    className="w-32 h-9"
                    options={[
                      { value: 'all', label: 'In: Both' },
                      { value: 'user', label: 'In: User' },
                      { value: 'details', label: 'In: Details' },
                    ]}
                  />
                  <Divider orientation="vertical" className="h-6 m-0" />
                  <Select 
                    value={activitySortOrder}
                    onChange={setActivitySortOrder}
                    className="w-36 h-9"
                    options={[
                      { value: 'desc', label: 'Newest First' },
                      { value: 'asc', label: 'Oldest First' },
                    ]}
                  />
                </div>

                {processedActivities.length > 0 ? (
                  <Timeline
                    className="activity-timeline"
                    items={processedActivities.map((log, idx) => ({
                      dot: <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ring-2 ring-[#f5f5f5] ${idx === 0 && activitySortOrder === 'desc' ? 'bg-[#1677ff]' : 'bg-[#d9d9d9]'}`} />,
                      children: (
                        <div className="mb-8">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-semibold text-[rgba(0,0,0,0.88)] m-0">{log.user} {log.action}</p>
                            <span className="text-xs text-[rgba(0,0,0,0.45)] font-medium">{log.date}</span>
                          </div>
                          {log.details && (
                            <div className={`mt-2 p-3 rounded-md text-xs border border-[#f0f0f0] ${idx === 0 && activitySortOrder === 'desc' ? 'bg-[#e6f4ff] text-[#1677ff]' : 'bg-[#fafafa] text-[rgba(0,0,0,0.65)]'}`}>
                              {log.details}
                            </div>
                          )}
                        </div>
                      )
                    }))}
                  />
                ) : (
                  <Empty description="No activities found matching filters" className="mt-10" />
                )}
              </div>
            )}
            
            {activeTab === 'response' && (
              <div className="space-y-12 pb-20 max-w-5xl">
                {/* Activities Section */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-[#f0f0f0] pb-2 mb-8">
                    <h3 className="text-lg font-semibold text-[rgba(0,0,0,0.88)] m-0">Activities</h3>
                    <Button 
                      size="small"
                      onClick={() => isEditMode ? handleSave() : setIsEditMode(true)}
                      className="text-[#1677ff] border-[#1677ff] font-semibold uppercase px-4 rounded-sm"
                    >
                      {isEditMode ? 'SAVE' : 'EDIT'}
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-[250px_1fr] items-center gap-4">
                      <label className="text-[12px] font-semibold text-[rgba(0,0,0,0.45)]">Submission Title</label>
                      <Input 
                        disabled={!isEditMode}
                        value={data.title}
                        onChange={e => setData({...data, title: e.target.value})}
                        className="h-9 border-[#d9d9d9] rounded-sm"
                      />
                    </div>

                    <div className="grid grid-cols-[250px_1fr] items-center gap-4">
                      <label className="text-[12px] font-semibold text-[rgba(0,0,0,0.45)]">Submission Ref No</label>
                      <Input 
                        disabled={!isEditMode}
                        value={data.submissionRef}
                        onChange={e => setData({...data, submissionRef: e.target.value})}
                        className="h-9 border-[#d9d9d9] rounded-sm"
                      />
                    </div>

                    <div className="grid grid-cols-[250px_1fr] items-center gap-4">
                      <label className="text-[12px] font-semibold text-[rgba(0,0,0,0.45)]">Date became aware</label>
                      <DatePicker 
                        disabled={!isEditMode}
                        value={data.dateAware ? dayjs(data.dateAware) : null}
                        onChange={(date) => setData({...data, dateAware: date ? date.format('YYYY-MM-DD') : ''})}
                        className="w-full h-9 border-[#d9d9d9] rounded-sm"
                      />
                    </div>

                    <div className="grid grid-cols-[250px_1fr] items-center gap-4">
                      <label className="text-[12px] font-semibold text-[rgba(0,0,0,0.45)]">Notice give by / Responsible Party</label>
                      <div className="flex border border-[#d9d9d9] rounded-sm overflow-hidden h-9">
                        <button 
                          onClick={() => isEditMode && setData({...data, noticeGivenBy: 'Main Contractor'})}
                          className={`flex-1 px-4 text-xs font-bold transition-colors ${data.noticeGivenBy === 'Main Contractor' ? 'bg-[#003a8c] text-white' : 'bg-[#e8ecef] text-[rgba(0,0,0,0.65)] hover:bg-[#d9d9d9]'}`}
                        >
                          Main Contractor
                        </button>
                        <button 
                          onClick={() => isEditMode && setData({...data, noticeGivenBy: 'PM'})}
                          className={`flex-1 px-4 text-xs font-bold transition-colors ${data.noticeGivenBy === 'PM' ? 'bg-[#003a8c] text-white' : 'bg-[#e8ecef] text-[rgba(0,0,0,0.65)] hover:bg-[#d9d9d9]'}`}
                        >
                          PM
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-[250px_1fr] items-start gap-4">
                      <label className="text-[12px] font-semibold text-[rgba(0,0,0,0.45)] pt-1">Early Warning Category</label>
                      <div className="flex border border-[#d9d9d9] rounded-sm overflow-hidden min-h-[160px]">
                        <div className="w-1/3 p-4 bg-white border-r border-[#d9d9d9] text-[11px] leading-relaxed italic text-[rgba(0,0,0,0.45)]">
                          Under NEC Clause 16.1 notice is given that we have become aware of a matter which could:
                        </div>
                        <div className="w-2/3 p-4 bg-white space-y-3">
                          {[
                            'Increasing the Total of the Price',
                            'Delaying Completion',
                            'Delaying Meeting a Key Date',
                            'Impairing the performance of the work in work',
                            "Increasing the Contractor's total cost"
                          ].map(cat => (
                            <div key={cat} className="flex items-start gap-3">
                              <Checkbox 
                                disabled={!isEditMode}
                                checked={data.categories.includes(cat)}
                                onChange={e => {
                                  const cats = e.target.checked 
                                    ? [...data.categories, cat]
                                    : data.categories.filter(c => c !== cat);
                                  setData({...data, categories: cats});
                                }}
                              />
                              <span className="text-xs text-[rgba(0,0,0,0.88)] font-medium">{cat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-[250px_1fr] items-start gap-4 pt-4">
                      <label className="text-[12px] font-semibold text-[rgba(0,0,0,0.45)]">Description</label>
                      <TextArea 
                        disabled={!isEditMode}
                        value={data.description}
                        onChange={e => setData({...data, description: e.target.value})}
                        autoSize={{ minRows: 6 }}
                        className="border-[#d9d9d9] rounded-sm p-4 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Risk Management Section */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-[#f0f0f0] pb-2 mb-8">
                    <h3 className="text-lg font-semibold text-[rgba(0,0,0,0.88)] m-0">Risk Management</h3>
                    <Button 
                      size="small" 
                      onClick={() => isEditMode ? handleSave() : setIsEditMode(true)}
                      className="text-[#1677ff] border-[#1677ff] font-semibold uppercase px-4 rounded-sm"
                    >
                      {isEditMode ? 'SAVE' : 'EDIT'}
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-[250px_1fr] items-center gap-4">
                      <label className="text-[12px] font-semibold text-[rgba(0,0,0,0.45)]">Early warning meeting required?</label>
                      <Select 
                        disabled={!isEditMode}
                        value={data.riskMeetingRequired}
                        onChange={val => setData({...data, riskMeetingRequired: val})}
                        className="w-full h-10"
                        options={[
                          { value: 'To be discussed at next scheduled early warning meeting', label: 'To be discussed at next scheduled early warning meeting' },
                          { value: 'Immediate meeting required', label: 'Immediate meeting required' }
                        ]}
                      />
                    </div>

                    <div className="grid grid-cols-[250px_1fr] items-center gap-4">
                      <label className="text-[12px] font-semibold text-[rgba(0,0,0,0.45)]">Likelihood</label>
                      <Select 
                        disabled={!isEditMode}
                        value={data.likelihood}
                        onChange={val => setData({...data, likelihood: val})}
                        className="w-full h-10"
                        options={['Low', 'Medium', 'High'].map(v => ({ value: v, label: v }))}
                      />
                    </div>

                    <div className="grid grid-cols-[250px_1fr] items-center gap-4">
                      <label className="text-[12px] font-semibold text-[rgba(0,0,0,0.45)]">Severity</label>
                      <Select 
                        disabled={!isEditMode}
                        value={data.severity}
                        onChange={val => setData({...data, severity: val})}
                        className="w-full h-10"
                        options={['Minor', 'Moderate', 'High', 'Critical'].map(v => ({ value: v, label: v }))}
                      />
                    </div>

                    <div className="grid grid-cols-[250px_1fr] items-center gap-4">
                      <label className="text-[12px] font-semibold text-[rgba(0,0,0,0.45)]">Priority</label>
                      <Select 
                        disabled={!isEditMode}
                        value={data.priority}
                        onChange={val => setData({...data, priority: val})}
                        className="w-full h-10"
                        options={['Low', 'Medium', 'High', 'Urgent'].map(v => ({ value: v, label: v }))}
                      />
                    </div>

                    <div className="grid grid-cols-[250px_1fr] items-center gap-4">
                      <label className="text-[12px] font-semibold text-[rgba(0,0,0,0.45)]">Risk classification PM</label>
                      <Select
                        mode="tags"
                        disabled={!isEditMode}
                        value={data.tags}
                        onChange={tags => setData({...data, tags})}
                        className="w-full"
                        placeholder="Choose tags:"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={null}
        width={800}
        centered
        title={`Preview: ${previewFile?.name}`}
        styles={{ body: { padding: 0, height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' } }}
      >
        {previewFile && (
          <div className="w-full h-full flex flex-col overflow-hidden">
            {['jpg', 'png', 'jpeg'].includes(previewFile.type.toLowerCase()) ? (
              <img 
                src={`https://picsum.photos/seed/${previewFile.name}/1200/800`} 
                alt={previewFile.name} 
                className="max-sm:w-full max-h-full object-contain"
                referrerPolicy="no-referrer"
              />
            ) : previewFile.type.toLowerCase() === 'pdf' ? (
              <div className="w-full h-full flex flex-col p-8 items-center gap-8 overflow-y-auto bg-slate-200">
                <div className="w-[500px] bg-white shadow-xl p-12 min-h-[700px] flex flex-col gap-6">
                  <div className="h-4 bg-slate-100 w-3/4 rounded animate-pulse"></div>
                  <div className="h-4 bg-slate-100 w-1/2 rounded animate-pulse"></div>
                  <div className="h-32 bg-slate-50 border border-dashed border-slate-200 rounded flex items-center justify-center">
                    <span className="text-slate-300 italic">Mock PDF content for {previewFile.name}</span>
                  </div>
                  <div className="space-y-4 pt-10">
                    <div className="h-3 bg-slate-100 w-full rounded"></div>
                    <div className="h-3 bg-slate-100 w-full rounded"></div>
                    <div className="h-3 bg-slate-100 w-2/3 rounded"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-20 text-center">
                <Empty description="Preview not available for this file type" />
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DetailPage;
