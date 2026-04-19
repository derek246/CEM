import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Button, Space, Tabs, Tag, Input, Checkbox, 
  Table, Timeline, Avatar, Divider, Empty, 
  Select, Tooltip, message, Modal
} from 'antd';
import { 
  ArrowLeftOutlined, LeftOutlined, RightOutlined, 
  MinusOutlined, PlusOutlined, FullscreenOutlined, 
  DownloadOutlined, PrinterOutlined, EditOutlined,
  HistoryOutlined, CheckCircleOutlined, UsergroupAddOutlined,
  CalendarOutlined, FilePdfOutlined, FileImageOutlined,
  EyeOutlined, DeleteOutlined, UploadOutlined,
  InfoCircleOutlined,
  CheckOutlined
} from '@ant-design/icons';
import { getStore, updateWarning } from '../store/demoStore';
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
          <Space split={<RightOutlined className="text-[10px] text-[rgba(0,0,0,0.25)]" />} className="text-sm font-medium">
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
            <Divider type="vertical" className="h-6 mx-2" />
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
            className="px-8 pt-4 shrink-0"
            items={[
              { key: 'general', label: 'General Information' },
              { key: 'approval', label: 'Approval Progress' },
              { key: 'response', label: 'Response' },
              { key: 'activities', label: 'Activities' },
            ]}
          />

          <div className="flex-1 overflow-y-auto px-8 py-6 no-scrollbar">
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
                    <Input 
                      disabled={!isEditMode} 
                      value={data.dateAware} 
                      suffix={<CalendarOutlined className="text-[rgba(0,0,0,0.25)]" />}
                      className="h-10 border-[#f0f0f0] rounded-md" 
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[12px] font-semibold text-[rgba(0,0,0,0.45)] mb-2">Notice Given By / Responsible Party</label>
                    <div className="inline-flex p-1 bg-[#f5f5f5] border border-[#f0f0f0] rounded-md">
                      <Button 
                        size="small" 
                        type={data.noticeGivenBy === 'Main Contractor' ? 'primary' : 'text'}
                        onClick={() => isEditMode && setData({...data, noticeGivenBy: 'Main Contractor'})}
                        className={data.noticeGivenBy === 'Main Contractor' ? 'shadow-sm font-semibold' : 'text-[rgba(0,0,0,0.45)] font-medium'}
                      >
                        Main Contractor
                      </Button>
                      <Button 
                        size="small" 
                        type={data.noticeGivenBy === 'PM' ? 'primary' : 'text'}
                        onClick={() => isEditMode && setData({...data, noticeGivenBy: 'PM'})}
                        className={data.noticeGivenBy === 'PM' ? 'shadow-sm font-semibold' : 'text-[rgba(0,0,0,0.45)] font-medium'}
                      >
                        PM
                      </Button>
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
                        <Divider type="vertical" />
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
                          render: () => (
                            <Space>
                              <Button size="small" type="text" icon={<EyeOutlined />} />
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
                  <Button type="link" icon={<EditOutlined />} className="text-[#1677ff] font-semibold text-sm">Filter</Button>
                </header>

                <Timeline
                  className="activity-timeline"
                  items={data.activityLog.map((log, idx) => ({
                    dot: <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ring-2 ring-[#f5f5f5] ${idx === 0 ? 'bg-[#1677ff]' : 'bg-[#d9d9d9]'}`} />,
                    children: (
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-semibold text-[rgba(0,0,0,0.88)] m-0">{log.user} {log.action}</p>
                          <span className="text-xs text-[rgba(0,0,0,0.45)] font-medium">{log.date}</span>
                        </div>
                        {log.details && (
                          <div className={`mt-2 p-3 rounded-md text-xs border border-[#f0f0f0] ${idx === 0 ? 'bg-[#e6f4ff] text-[#1677ff]' : 'bg-[#fafafa] text-[rgba(0,0,0,0.65)]'}`}>
                            {log.details}
                          </div>
                        )}
                      </div>
                    )
                  }))}
                />
              </div>
            )}
            
            {activeTab === 'response' && (
              <div className="space-y-8 pb-12">
                <div className="flex items-center justify-between">
                  <Space align="center" size={12}>
                    <div className="w-1 h-5 bg-[#1677ff] rounded-full" />
                    <h3 className="text-lg font-semibold text-[rgba(0,0,0,0.88)] m-0">Response</h3>
                  </Space>
                  <Tag color="processing" style={{ borderRadius: 4, fontWeight: '600', padding: '0 12px' }}>
                    {data.response?.status || 'Awaiting Response'}
                  </Tag>
                </div>

                {data.response ? (
                  <div className="space-y-6">
                    <div className="bg-[#fafafa] rounded-md border border-[#f0f0f0] overflow-hidden">
                      <div className="px-6 py-4 border-b border-[#f0f0f0] flex justify-between items-center bg-white">
                        <Space size="middle">
                          <Avatar className="bg-[#1677ff]">{data.response.responder[0]}</Avatar>
                          <div>
                            <div className="text-sm font-bold text-[rgba(0,0,0,0.88)]">{data.response.responder}</div>
                            <div className="text-[11px] text-[rgba(0,0,0,0.45)] font-semibold uppercase tracking-wider">{data.response.responderRole}</div>
                          </div>
                        </Space>
                        <div className="text-right">
                          <div className="text-[12px] font-semibold text-[rgba(0,0,0,0.45)]">Response Date</div>
                          <div className="text-sm font-medium">{data.response.date}</div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="text-[12px] font-semibold text-[rgba(0,0,0,0.45)] uppercase mb-2">Content</div>
                        <div className="text-sm text-[rgba(0,0,0,0.88)] leading-relaxed bg-white p-4 rounded border border-[#f0f0f0]">
                          {data.response.content}
                        </div>

                        {data.response.instructionToContractor && (
                          <div className="mt-6 p-4 bg-[#fff1f0] border border-[#ffa39e] rounded-md">
                            <div className="flex items-center gap-2 mb-2 text-[#cf1322]">
                              <InfoCircleOutlined />
                              <span className="text-[12px] font-bold uppercase tracking-wider">Instruction to Contractor</span>
                            </div>
                            <p className="text-sm text-[rgba(0,0,0,0.88)] m-0 font-medium italic">
                              "{data.response.instructionToContractor}"
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="block text-[12px] font-semibold text-[rgba(0,0,0,0.45)]">Reply to Response</label>
                      </div>
                      <div className="rounded-md border border-[#f0f0f0] overflow-hidden shadow-sm">
                        <TextArea 
                          placeholder="Type your reply here..."
                          autoSize={{ minRows: 4 }}
                          className="border-none focus:ring-0 p-4"
                        />
                        <div className="bg-[#fafafa] p-3 flex justify-end border-t border-[#f0f0f0]">
                          <Button type="primary" size="small" className="font-bold px-6">SUBMIT REPLY</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#fafafa] rounded-md border border-dashed border-[#d9d9d9] p-20 text-center">
                    <HistoryOutlined style={{ fontSize: 48, color: '[rgba(0,0,0,0.15)]' }} />
                    <h3 className="text-lg font-semibold text-[rgba(0,0,0,0.45)] mt-4">Awaiting Project Manager Response</h3>
                    <p className="text-sm text-[rgba(0,0,0,0.25)]">The status of this Early Warning is currently {data.status}.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
