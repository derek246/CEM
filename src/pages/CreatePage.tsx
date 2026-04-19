import React from 'react';
import { 
  Form, Input, Button, DatePicker, Select, 
  Checkbox, Tag, Space, Divider, message 
} from 'antd';
import { 
  InfoCircleOutlined, AppstoreOutlined, FileTextOutlined, 
  WarningOutlined, SaveOutlined, ArrowLeftOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { addWarning } from '../store/demoStore';
import { EarlyWarning } from '../types';
import dayjs from 'dayjs';

const { TextArea } = Input;

const CreatePage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    const newWarning: EarlyWarning = {
      id: `DC/2024/09-EWN-${Math.floor(Math.random() * 9000) + 1000}`,
      submissionRef: values.submissionRef,
      title: values.title,
      type: 'Early Warning Notice',
      version: '1.0',
      dateAware: values.dateAware?.format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD'),
      notifiedDate: dayjs().format('YYYY-MM-DD'),
      replyRequiredDate: values.dateAware?.add(14, 'day').format('YYYY-MM-DD') || dayjs().add(14, 'day').format('YYYY-MM-DD'),
      noticeGivenBy: values.noticeGivenBy || 'Main Contractor',
      categories: values.categories || [],
      description: values.description,
      riskMeetingRequired: values.riskMeetingRequired,
      likelihood: values.likelihood || 'Medium',
      severity: values.severity || 'Medium',
      priority: values.priority || 'Medium',
      actionOwner: 'Michael Chen',
      status: 'Awaiting',
      tags: values.tags || [],
      files: [],
      approvalProgress: [
        { role: 'Assistant Quantity Surveyor', user: 'Michael Chen', date: dayjs().format('YYYY-MM-DD HH:mm:ss'), status: 'Created' }
      ],
      externalReviewers: [],
      activityLog: [
        { user: 'Michael Chen', action: 'created draft', date: dayjs().format('MMM DD') }
      ]
    };

    addWarning(newWarning);
    message.success('Draft created successfully');
    navigate('/');
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen py-12 px-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[12px] mb-6 text-[rgba(0,0,0,0.45)]">
          <span className="hover:text-[#1677ff] cursor-pointer">Early Warnings</span>
          <span className="text-[rgba(0,0,0,0.25)]">/</span>
          <span className="font-semibold text-[rgba(0,0,0,0.88)]">Project Manager Early Warnings</span>
        </nav>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[rgba(0,0,0,0.88)] tracking-tight m-0">Create Early Warning</h1>
          <p className="text-[rgba(0,0,0,0.45)] text-sm mt-1">Submit a new notice under NEC Clause 16.1</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg border border-[#f0f0f0] shadow-sm overflow-hidden">
          <Form 
            form={form} 
            layout="vertical" 
            onFinish={onFinish}
            initialValues={{
              type: 'Early Warning Notice',
              noticeGivenBy: 'Main Contractor',
              likelihood: 'Medium',
              severity: 'Moderate',
              priority: 'Medium',
              riskMeetingRequired: 'To be discussed at next scheduled early warning meeting'
            }}
          >
            {/* Section 1: General Information */}
            <section className="p-8">
              <Space align="center" className="mb-6">
                <div className="w-1 h-5 bg-[#1677ff] rounded-full" />
                <h2 className="text-lg font-semibold text-[rgba(0,0,0,0.88)] m-0 tracking-tight">General Information</h2>
              </Space>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                <Form.Item 
                  label={<span className="text-[12px] font-semibold text-[rgba(0,0,0,0.45)]">Submission Title</span>} 
                  name="title" 
                  className="col-span-2"
                  rules={[{ required: true, message: 'Please enter a title' }]}
                >
                  <Input placeholder="e.g. Flood on site" className="h-10 bg-[#fafafa] border-[#f0f0f0] rounded-md font-medium" />
                </Form.Item>

                <Form.Item 
                  label={<span className="text-[12px] font-semibold text-[rgba(0,0,0,0.45)]">Submission Type</span>} 
                  name="type"
                >
                  <Input readOnly className="h-10 bg-[#f5f5f5] border-none rounded-md text-[rgba(0,0,0,0.25)] cursor-not-allowed" />
                </Form.Item>

                <Form.Item 
                  label={<span className="text-[12px] font-semibold text-[rgba(0,0,0,0.45)]">Submission Ref No</span>} 
                  name="submissionRef"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="2413/EDMS/EWN/0039" className="h-10 bg-[#fafafa] border-[#f0f0f0] rounded-md" />
                </Form.Item>

                <Form.Item 
                  label={<span className="text-[12px] font-semibold text-[rgba(0,0,0,0.45)]">Date became aware</span>} 
                  name="dateAware"
                >
                  <DatePicker 
                     className="w-full h-10 bg-[#fafafa] border-[#f0f0f0] rounded-md" 
                     suffixIcon={<CalendarOutlined className="text-[rgba(0,0,0,0.25)]" />}
                  />
                </Form.Item>

                <Form.Item 
                  label={<span className="text-[12px] font-semibold text-[rgba(0,0,0,0.45)]">Notice given by / Responsible Party</span>} 
                  name="noticeGivenBy"
                >
                  <Select 
                    className="w-full h-10 bg-[#fafafa] rounded-md" 
                    options={[
                      { value: 'Main Contractor', label: 'Main Contractor' },
                      { value: 'PM', label: 'PM' }
                    ]}
                  />
                </Form.Item>
              </div>
            </section>

            <Divider className="m-0 border-[#f0f0f0]" />

            {/* Section 2: Early Warning Category */}
            <section className="p-8">
              <Space align="center" className="mb-6">
                <div className="w-1 h-5 bg-[#1677ff] rounded-full" />
                <h2 className="text-lg font-semibold text-[rgba(0,0,0,0.88)] m-0 tracking-tight">Early Warning Category</h2>
              </Space>
              
              <Form.Item name="categories">
                <Checkbox.Group className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Increasing the Total of the Price', 'Delaying Completion',
                      'Delaying Meeting a Key Date', 'Impairing the performance of the work'
                    ].map(cat => (
                      <div key={cat} className="p-4 border border-[#f0f0f0] rounded-md hover:bg-[#fafafa] transition-all flex items-center gap-3">
                        <Checkbox value={cat} className="m-0"><span className="text-sm font-medium text-[rgba(0,0,0,0.88)]">{cat}</span></Checkbox>
                      </div>
                    ))}
                  </div>
                </Checkbox.Group>
              </Form.Item>
            </section>

            <Divider className="m-0 border-[#f0f0f0]" />

            {/* Section 3: Description */}
            <section className="p-8">
              <Space align="center" className="mb-6">
                <div className="w-1 h-5 bg-[#1677ff] rounded-full" />
                <h2 className="text-lg font-semibold text-[rgba(0,0,0,0.88)] m-0 tracking-tight">Description</h2>
              </Space>
              <Form.Item name="description">
                <TextArea 
                  rows={4} 
                  placeholder="Describe the issue..." 
                  className="bg-[#fafafa] border-[#f0f0f0] rounded-md p-4 text-sm" 
                />
              </Form.Item>
            </section>

            <Divider className="m-0 border-[#f0f0f0]" />

            {/* Section 4: Risk Management */}
            <section className="p-8">
              <Space align="center" className="mb-6">
                <div className="w-1 h-5 bg-[#1677ff] rounded-full" />
                <h2 className="text-lg font-semibold text-[rgba(0,0,0,0.88)] m-0 tracking-tight">Risk Management</h2>
              </Space>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <Form.Item 
                  label={<span className="text-[12px] font-semibold text-[rgba(0,0,0,0.45)]">Early warning meeting required?</span>} 
                  name="riskMeetingRequired"
                  className="col-span-2"
                >
                  <Select className="h-10 w-full bg-[#fafafa] rounded-md">
                    <option value="To be discussed at next scheduled early warning meeting">To be discussed at next scheduled early warning meeting</option>
                    <option value="Immediate meeting required">Immediate meeting required</option>
                  </Select>
                </Form.Item>

                <Form.Item label={<span className="text-[12px] font-semibold text-[rgba(0,0,0,0.45)]">Likelihood</span>} name="likelihood">
                  <Select className="h-10 w-full bg-[#fafafa] rounded-md" options={['Low', 'Medium', 'High'].map(v=>({value:v,label:v}))} />
                </Form.Item>

                <Form.Item label={<span className="text-[12px] font-semibold text-[rgba(0,0,0,0.45)]">Severity</span>} name="severity">
                   <Select className="h-10 w-full bg-[#fafafa] rounded-md" options={['Minor', 'Moderate', 'High', 'Critical'].map(v=>({value:v,label:v}))} />
                </Form.Item>

                <Form.Item label={<span className="text-[12px] font-semibold text-[rgba(0,0,0,0.45)]">Priority</span>} name="priority">
                   <Select className="h-10 w-full bg-[#fafafa] rounded-md" options={['Low', 'Medium', 'High', 'Urgent'].map(v=>({value:v,label:v}))} />
                </Form.Item>
              </div>
            </section>

            {/* Footer */}
            <footer className="p-6 bg-[#fafafa] flex justify-end items-center gap-4 border-t border-[#f0f0f0]">
              <Button type="text" onClick={() => navigate('/')} className="px-6 h-10 text-sm font-semibold text-[rgba(0,0,0,0.65)]">
                Cancel
              </Button>
              <Button 
                type="primary" 
                htmlType="submit"
                icon={<SaveOutlined />} 
                className="px-8 h-10 font-bold text-sm shadow-sm"
              >
                Create Entry
              </Button>
            </footer>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
