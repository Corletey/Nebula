import React from 'react';
import { Layout, Menu, Card, List } from 'antd';
const { Header, Content, Footer } = Layout;

const data = [
  // Sample data
];

const ProjectPortal = () => {
  return (
    <Layout className="layout">
      <Header>
        {/* Header */}
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Card title={item.title}>Card content</Card>
            </List.Item>
          )}
        />
      </Content>
      <Footer>
        {/* Footer */}
      </Footer>
    </Layout>
  );
};

export default ProjectPortal;
