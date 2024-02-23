/**
 * This component is a code challenge that tests your knowledge of AWS services.
 * It displays a riddle and prompts the user to enter their answer.
 * If the answer is correct, a hint is provided.
 * 
 * @module Challenge
 */

import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, Input, message } from 'antd';

/**
 * An array of riddles about AWS services
 * @type {string[]}
 */
const awsRiddles = [
  "I'm an AWS service that provides resizable compute capacity in the cloud. I am designed to make web-scale cloud computing easier for developers. What am I?",
  "I'm a managed database service on AWS. You can use me to deploy, operate, and scale relational databases. What's my name?",
  "I'm a service that allows you to run code without provisioning or managing servers. You only pay for the compute time that you consume. What am I?",
  "I'm a content delivery service that securely delivers data, videos, applications, and APIs to customers globally. What's my name?",
  "I'm a service for building conversational interfaces into applications. Developers can use me to create chatbots and voice-enabled applications. Who am I?",
  "I'm an AWS storage service that offers industry-leading scalability, data availability, security, and performance. What is my name?",
  "I'm a fully managed service that makes it easy to set up, operate, and scale a relational database. You can choose from multiple database engines. What am I?",
  "I'm an AWS service that enables you to set up, operate, and scale a relational database in the cloud. My name is derived from a large river in South America. What service am I?",
  "I'm a service that provides a simple, fast, and cost-effective way to analyze streaming data with SQL queries. What is my name?",
  "I'm a service that allows you to discover, categorize, and tag AWS resources. I provide a unified view of AWS resources across your accounts. Who am I?",
  "I'm a service that provides secure and resizable compute capacity in the cloud. My name starts with an 'E'. What service am I?",
  "I'm a service for real-time analytics. You can use me to process and analyze streaming data using SQL or Java. What's my name?",
  "I'm a fully managed service that enables you to run containers without managing the underlying infrastructure. You can use me to deploy applications. Who am I?",
  "I'm a service that enables you to securely control access to AWS resources. I help you manage identities and permissions. What is my name?",
  "I'm an AWS service for creating and managing a virtualized server in the cloud. You can use me to run applications and host websites. What am I?",
  "I'm a service that allows you to automate manual tasks or processes. You can create workflows to integrate services using visual representations. What's my name?",
  "I'm a service that provides a set of tools for managing and optimizing AWS costs. You can use me to visualize, understand, and manage your AWS costs and usage. Who am I?",
  "I'm a machine learning service that makes it easy for developers to build, train, and deploy machine learning models. What's my name?",
  "I'm a service that enables you to easily set up, operate, and scale a distributed database. I am named after a large tropical river. What is my name?",
  "I'm a service that provides scalable and secure object storage. You can use me to store and retrieve any amount of data from anywhere on the web. What am I?",
  "I'm a service that allows you to deploy and manage applications in the AWS Cloud without worrying about the underlying infrastructure. What is my name?",
  "I'm a service that provides scalable and fully managed data warehouse. You can use me to analyze large datasets. What is my name?",
  "I'm a service that allows you to securely control access to AWS services and resources for your users. You can create and manage users and groups. Who am I?",
  "I'm a fully managed service that makes it easy to set up, operate, and scale a search solution. You can use me to add a search capability to your applications. What am I?",
  "I'm a service that provides scalable and cost-effective cloud storage for archiving and long-term backup. You can use me to store data that is accessed less frequently. What is my name?",
  "I'm a service that helps you build, secure, and scale APIs. You can use me to create APIs for your applications. What is my name?",
  "I'm a service that provides a set of pre-trained models for common natural language processing"
];

/**
 * An array of correct answers to the riddles
 * @type {string[]}
 */
const correctAnswers = [
  "EC2",
  "RDS",
  "Lambda",
  "CloudFront",
  "Lex",
  "S3",
  "RDS",
  "Aurora",
  "Kinesis",
  "Resource groups",
  "EC2",
  "Kinesis",
  "ECS",
  "IAM",
  "EC2",
  "Step Functions",
  "Cost Explorer",
  "SageMaker",
  "DynamoDB",
  "S3",
  "Elastic Beanstalk",
  "Redshift",
  "IAM",
  "Elasticsearch",
  "Glacier",
  "API Gateway",
  "Comprehend",
  "CloudWatch",
  "S3",
  "Lambda"
];

/**
 * A component that displays a riddle and prompts the user to enter their answer
 * @function
 * @returns {JSX.Element} The Challenge component
 */
const ChallengeComponent = () => {
  const [currentRiddle, setCurrentRiddle] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  /**
   * Checks the user's answer and displays a message indicating whether it is correct or incorrect
   */
  const checkAnswer = () => {
    // const correctAnswer = correctAnswers[awsRiddles.indexOf(currentRiddle)];
    // convert to lowercase
    const correctAnswer = correctAnswers[awsRiddles.indexOf(currentRiddle)].toLowerCase();

    if (inputValue === correctAnswer) {
      message.success('Correct Answer! Here is your hint.');
      setIsModalVisible(true);
    } else {
      message.error('Incorrect Answer. Try again.');
    }
  };

  /**
   * Sets the current riddle to a random riddle from the awsRiddles array
   */
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * awsRiddles.length);
    setCurrentRiddle(awsRiddles[randomIndex]);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Card title="AWS Challenge" bordered={false} style={{ width: 500 }}>
        <p><strong>Challenge:</strong> {currentRiddle}</p>

        <Input
          placeholder="Enter your answer"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onPressEnter={checkAnswer}
        />
        <Button type="primary" onClick={checkAnswer} style={{ marginTop: '10px' }}>
          Submit Answer
        </Button>
      </Card>

      <Modal
        title="Congratulations!"
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Here's your hint:</p>
        <p><i>"Remember, good code is like a good joke: it needs no explanation." - Unknown</i></p>

        <p>
        <strong>-- Students Table</strong><br></br>
        CREATE TABLE IF NOT EXISTS students (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            attendance_average DECIMAL(5,2) NOT NULL,
            assignment_completion INT NOT NULL,
            ranking INT NOT NULL,
            cohort VARCHAR(255) NOT NULL
        );
        </p>
      </Modal>
    </div>
  );
};

export default ChallengeComponent;