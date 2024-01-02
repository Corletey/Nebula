import React from 'react';
import { Layout, Table } from 'antd';
const { Header, Content, Footer } = Layout;

const columns = [
  // Define columns
];

const data = [
  // Data
];

const AdminPanel = () => {
  return (
    <Layout className="layout">
      <Header>
        {/* Header */}
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Table columns={columns} dataSource={data} />
      </Content>
      <Footer>
        {/* Footer */}
      </Footer>
    </Layout>
  );
};

export default AdminPanel;
