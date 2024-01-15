// src/components/ConfigurationPage.js
import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col, Spin, Divider } from 'antd';
import { InfoCircleTwoTone } from '@ant-design/icons';
import axios from 'axios';

const ConfigurationPage = () => {
  const [backendUrl, setBackendUrl] = useState('');
  const [dbConfig, setDbConfig] = useState({
    host: '',
    user: '',
    password: '',
    database: ''
  });
  const [loading, setLoading] = useState(false);

  const onDbConfigChange = (e) => {
    setDbConfig({ ...dbConfig, [e.target.name]: e.target.value });
  };

  const testDbConnection = () => {
    if (!backendUrl) {
      message.error('Please enter the Backend URL');
      return;
    }
    setLoading(true);
    axios.post(`${backendUrl}/api/test-db-connection`, dbConfig)
      .then(response => message.success('Database connection successful!'))
      .catch(error => message.error('Database connection failed.'))
      .finally(() => setLoading(false));
  };

  const testBackendLink = () => {
    if (!backendUrl) {
      message.error('Please enter the Backend URL');
      return;
    }
    setLoading(true);
    // delete localStorage backendUrl;

    localStorage.removeItem('backendUrl');

    axios.get(`${backendUrl}/api/health-check`)
      .then(response => message.success('Backend connection successful!'))
      .catch(error => message.error('Backend connection failed.'))
      .finally(() => setLoading(false));
  };

  const saveBackendUrl = () => {
    if (!backendUrl) {
        message.error('Please enter the Backend URL');
        return;
    }
    localStorage.setItem('backendUrl', backendUrl);
    message.success('Backend URL saved successfully');
};


  return (
    <div style={{padding:'2rem 15%'}}>
      <Spin spinning={loading}>

        <div style={{color:'rgba(0,0,0,.8)',marginBottom:'3rem'}}>
            <h2>
    
            The Core (Back-End Odyssey)
            </h2> 
            <p>Here, your <strong>🐍 Python</strong> skills will bend space and time to connect front and back ends. 
                Ignite the AWS-powered 🚀 <strong>databases</strong> to store the universe of data securely and efficiently. 
                <strong> 🐳 Containerize</strong> your creation for a journey that transcends environments. 
</p><p>
            Tools at Your Disposal: AWS (Amazon Web Services):☁️, Python:🐍, Docker:🐳, Linux:🐧, Your limitless imagination: ✨
            </p>
        </div>
        <Divider />
        <Row gutter={16} style={{color:'black',textAlign:'left'}}>
        
    <Col span={14}>
        <h3 style={{textAlign:'left'}}>Data Structure Explanation</h3>
        <p>The data represents information about a student in a dashboard system. Each student record includes:</p>

    <ul>
        <li>
            <strong>Basic Details:</strong>
            <p>Includes the <code style={{color:'blue'}}><b>name</b></code>, <code style={{color:'blue'}}><b>email</b></code>, <code style={{color:'blue'}}><b>cohort</b></code> (the group or class the student belongs to), and <code style={{color:'blue'}}><b>ranking</b></code> (a numerical ranking of the student).</p>
        </li>
        <li>
            <strong>Academic Performance Metrics:</strong>
            <p>Consists of <code style={{color:'blue'}}><b>assignment_completion</b></code> (the number of assignments completed) and <code style={{color:'blue'}}><b>attendance_average</b></code> (the average attendance percentage).</p>
        </li>
        <li>
            <strong>Weekly Attendance List:</strong>
            <p>A detailed breakdown of weekly attendance. Each entry includes the <code style={{color:'blue'}}><b>week</b></code> identifier, the number of days the student was <code style={{color:'blue'}}><b>present</b></code> and <code style={{color:'blue'}}><b>absent</b></code>.</p>
        </li>
    </ul>
        </Col>
        <Col span={1}/>
        <Col span={9}>
        <h3 style={{textAlign:'left', color:'black'}}>List of APIs</h3>
        <ol style={{textAlign:'left',color:'black'}}>
            <li><code style={{color:'purple'}}>GET</code> <code style={{color:'blue'}}>"/api/health-check"</code> - Health Check</li>
            <li><code style={{color:'purple'}}>POST</code> <code style={{color:'blue'}}>"/api/test-db-connection"</code> - Test Database Connection</li>
            <li><code style={{color:'purple'}}>GET</code> <code style={{color:'blue'}}>"/api/students"</code> - Get All Students</li>
            <li><code style={{color:'purple'}}>POST</code> <code style={{color:'blue'}}>"/api/student/[email]"</code> - Get A Students Details</li>
            <li><code style={{color:'purple'}}>GET</code> <code style={{color:'blue'}}>"/api/cohort/stats/[cohort_name]"</code> - Get Cohort Stats</li>
            <li><code style={{color:'purple'}}>GET</code> <code style={{color:'blue'}}>"/api/cohort/attendance/[cohort_name]"</code> - Get Cohort attendance stats (Graph)</li>
        </ol>
        </Col>
    </Row>

    <p style={{color:'grey',textAlign:'right'}}>
        <InfoCircleTwoTone/> <b>Hint:</b> our front-end dev is on vacation so we hope you can work with their structure
    </p>
        <Divider />
        <Form layout="vertical" autoComplete='off' style={{textAlign:'left'}}>
        
        <h3 style={{textAlign:'left'}}>[A] Server Configuration</h3>
        <code style={{color:'purple'}}> Testing on "..backendurl/api/health-check"</code>
          <Divider />
          <Row gutter={16} style={{marginBottom:'5rem'}}>
            
          
            <Col span={12}>
              <Form.Item label="Backend URL">
                <Input value={backendUrl} onChange={(e) => setBackendUrl(e.target.value)} 
                placeholder="http://ip_address:3000"
                />

              </Form.Item>
              <code> using <b>{localStorage.getItem('backendUrl')}</b> as your backend server</code>
            </Col>
            <Col span={12}>
                <Button type="primary" onClick={testBackendLink} style={{ marginTop: '32px', marginRight: '10px' }}>Test Backend Link</Button>
                <Button type="primary" onClick={saveBackendUrl} style={{ marginTop: '32px',backgroundColor:'black' }}>Save Backend URL</Button>
            </Col>
          </Row>
          <Divider />
          <h3 style={{textAlign:'left'}}>[B] Database Configuration</h3>
          
        <code style={{color:'purple'}}> Testing on "..backendurl/api/test-db-connection"</code>
          <Divider />
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Database Host">
                <Input name="host" value={dbConfig.host} onChange={onDbConfigChange} 
                placeholder="localhost"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Database User">
                <Input name="user" value={dbConfig.user} onChange={onDbConfigChange} 
                placeholder="root"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Database Password">
                <Input.Password name="password" value={dbConfig.password} onChange={onDbConfigChange} 
                placeholder="password"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Database Name">
                <Input name="database" value={dbConfig.database} onChange={onDbConfigChange} 
                placeholder="nebula"
                />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" style={{backgroundColor:'brown',marginBottom:'5rem'}} onClick={testDbConnection}>Test Database Connection</Button>
        </Form>


        <Divider />
    

      </Spin>
    </div>
  );
};

export default ConfigurationPage;
