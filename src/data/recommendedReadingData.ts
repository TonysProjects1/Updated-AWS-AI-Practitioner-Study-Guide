export interface ReadingResource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'Whitepaper' | 'Documentation' | 'Blog' | 'Course';
}

export const recommendedReadingData: ReadingResource[] = [
  {
    id: 'exam-guide',
    title: 'AWS Certified AI Practitioner (AIF-C01) Exam Guide',
    description: 'The official exam guide detailing the domains, scope, and objectives of the certification.',
    url: 'https://d1.awsstatic.com/training-and-certification/docs-ai-practitioner/AWS-Certified-AI-Practitioner_Exam-Guide.pdf',
    type: 'Documentation'
  },
  {
    id: 'gen-ai-aws',
    title: 'Generative AI on AWS',
    description: 'Overview of the generative AI stack on AWS, including Amazon Bedrock and foundation models.',
    url: 'https://aws.amazon.com/generative-ai/',
    type: 'Documentation'
  },
  {
    id: 'ml-lens',
    title: 'AWS Well-Architected Framework: Machine Learning Lens',
    description: 'Best practices for designing and deploying machine learning workloads across the ML lifecycle on AWS.',
    url: 'https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/machine-learning-lens.html',
    type: 'Whitepaper'
  },
  {
    id: 'amazon-bedrock-docs',
    title: 'Amazon Bedrock Documentation',
    description: 'Learn how to build and scale generative AI applications with foundation models.',
    url: 'https://docs.aws.amazon.com/bedrock/',
    type: 'Documentation'
  },
  {
    id: 'sagemaker-docs',
    title: 'Amazon SageMaker Documentation',
    description: 'Comprehensive guide to building, training, and deploying machine learning models on AWS.',
    url: 'https://docs.aws.amazon.com/sagemaker/',
    type: 'Documentation'
  },
  {
    id: 'responsible-ai',
    title: 'Responsible AI in the Cloud',
    description: 'AWS guidelines and tools for building AI systems that are fair, unbiased, and secure.',
    url: 'https://aws.amazon.com/machine-learning/responsible-ai/',
    type: 'Whitepaper'
  },
  {
    id: 'aws-q-business',
    title: 'Amazon Q Business',
    description: 'Generative AI-powered assistant that can answer questions, provide summaries, generate content, and securely complete tasks based on data and information in your enterprise systems.',
    url: 'https://aws.amazon.com/q/business/',
    type: 'Documentation'
  }
];
