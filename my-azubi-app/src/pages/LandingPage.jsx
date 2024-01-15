import React from 'react';
import { Layout, Breadcrumb, Typography, Card, Row, Col, Space, Divider } from 'antd';
import { CloudServerOutlined, ApiOutlined, InfoCircleTwoTone,DatabaseOutlined,ArrowDownOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

import Spacedayimage from '../assets/spaceday.png'

const LandingPage = () => {
  return (
    <Layout className="layout">
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          {/* Breadcrumb items */}
        </Breadcrumb>
        <div className="site-layout-content">
          <Space direction="vertical" size="large">
            {/* <Title level={1}>Welcome to Project Nebula 🚀</Title> */}
            <Row gutter={16}>
                
            <Col span={12}>
                    <img src={Spacedayimage}
                     alt="Project Nebula" 
                     style={{ width: '70%', height: 'auto'}}
                     />
                </Col>
                <Col span={12} style={{marginTop:'5rem'}}>
                    <Card>

            <Paragraph
            style={{ fontSize: '1.02rem',padding: '2rem'}}>
              <b>Project Nebula</b> is an innovative initiative by <a href="https://azubiafrica.org" target='_blank'>Azubi Africa</a>, aiming to empower students 
              with hands-on experience in cloud technology, problem solving, and portfolio development skills. 
              This project offers a unique platform for the student to engage in a real-world project, 
              enhancing their understanding and proficiency in tech domains.
            </Paragraph>
                    </Card>
                </Col>
            </Row>

            {/* add the arrowdown icon, once clicked, it scrolls */}
            <button className='dropbtn' style={{border:'none',backgroundColor:'transparent'}}><ArrowDownOutlined style={{fontSize:'1rem',color:'blue'}}/></button>

                {/* animate the button (up n down) */}
            
            <style jsx>{`
            .dropbtn {
                animation: bounce 2s infinite;
            }
            @keyframes bounce {
                0% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
                100% { transform: translateY(0); }
            }
            `}</style>


            <Divider />

            <Title level={2}><u>Your Role in Shaping the Future</u></Title>
            <Paragraph
            style={{ fontSize: '1rem',padding: '1.4rem 5rem'}}
            >
              As aspiring cloud engineers and tech enthusiasts, you have the opportunity to dive deep into 
              the practical aspects of cloud computing and development. Here's how you can contribute:
            </Paragraph>

            <Row gutter={16}>
              <Col span={8}>
                <Card 
                  title="1. Backend Development"
                  headStyle={{ textAlign: 'center',color: 'purple' }}
                  actions={[<DatabaseOutlined key="database" />]}
                >
                  Develop and integrate robust backend services, handling data processing, 
                  storage solutions, and API development.
                </Card>
              </Col>
              <Col span={8}>
                <Card 
                  title="2. API Integration"
                  headStyle={{ textAlign: 'center',color: 'brown' }}
                  actions={[<ApiOutlined key="api" />]}
                >
                  Work on connecting various external APIs to enhance the functionality of the platform, 
                  providing a seamless user experience.
                </Card>
              </Col>
              <Col span={8}>
                <Card 
                  title="3. Cloud Infrastructure"
                  headStyle={{ textAlign: 'center',color: 'blue' }}
                  actions={[<CloudServerOutlined key="cloud" />]}
                >
                  Implement and manage cloud infrastructure using AWS and Docker, ensuring scalability 
                  and security of the application.
                </Card>
              </Col>
            </Row>

            <Divider/>

            <Paragraph style={{fontStyle:'italic'}}>
              <InfoCircleTwoTone/> Your contribution is vital in building a comprehensive platform that not only serves as a 
              learning tool but also as a showcase of your skills to potential employers.
            </Paragraph>
            {/* Additional content */}
          </Space>
        </div>
      </Content>
      <Divider/>
      <Footer style={{ textAlign: 'center',background:'transparent' }}>
        <strong>Azubi Africa ©{new Date().getFullYear()}</strong> - LawrenceMuema
      </Footer>
    </Layout>
  );
};

export default LandingPage;
