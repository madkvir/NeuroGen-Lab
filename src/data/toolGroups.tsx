import React from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Instagram,
  LayoutGrid,
  Phone,
  MessageCircle,
  Shield,
  Network,
  Mail,
  Webhook,
  BookOpen,
  Cloud,
  Building2,
  Bot,
  Brain,
  Code,
  Users,
  Ticket,
  Puzzle,
  Table2,
  Headphones,
  MessageSquareMore,
  Search
} from 'lucide-react';

export const toolGroups = {
  'AI Tools for Business': [
    {
      icon: <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: 'AI Chat Bot',
      component: Link,
      to: '/tools/ai-chat-bot',
      hot: true
    },
    {
      icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: 'AI Voice Bot',
      component: Link,
      to: '/tools/ai-voice-bot',
      hot: true
    },
    {
      icon: <Bot className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: 'AI Avatar',
      component: Link,
      to: '/tools/ai-avatar',
      hot: true
    },
    {
      icon: <Brain className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: 'AI Assistant',
      component: Link,
      to: '/tools/ai-assistant',
      hot: true
    },
    {
      icon: <Code className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: 'Custom Development',
      component: Link,
      to: '/tools/custom-development'
    },
    {
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: 'Counseling',
      component: Link,
      to: '/tools/counseling'
    }
  ],
  'Messaging': [
    {
      icon: <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: 'Facebook Messenger',
      component: Link,
      to: '/tools/facebook-messenger',
      hot: true
    },
    {
      icon: <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: 'Instagram',
      component: Link,
      to: '/tools/instagram',
      hot: true
    },
    {
      icon: <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: 'WhatsApp',
      component: Link,
      to: '/tools/whatsapp',
      hot: true
    }
  ],
  'Integration': [
    {
      icon: <Ticket className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: 'Jira',
      component: Link,
      to: '/tools/jira'
    },
    {
      icon: <Puzzle className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: 'Zapier',
      component: Link,
      to: '/tools/zapier'
    },
    {
      icon: <Table2 className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: 'Tables',
      component: Link,
      to: '/tools/tables'
    }
  ],
  'Security & Search': [
    {
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: 'Anti-Spam',
      component: Link,
      to: '/tools/anti-spam',
      hot: true
    },
    {
      icon: <Search className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: 'Best Search',
      component: Link,
      to: '/tools/best-search',
      hot: true
    }
  ],
  'Communication': [
    {
      icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: 'Email',
      component: Link,
      to: '/tools/email'
    },
    {
      icon: <MessageSquareMore className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: 'Slack',
      component: Link,
      to: '/tools/slack'
    },
    {
      icon: <Headphones className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: 'LiveChat',
      component: Link,
      to: '/tools/livechat'
    },
    {
      icon: <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: 'Intercom',
      component: Link,
      to: '/tools/intercom'
    }
  ],
  'Coming Soon': [
    {
      icon: <Cloud className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: 'Salesforce',
      component: Link,
      to: '/tools/salesforce',
      coming: true
    },
    {
      icon: <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: 'HubSpot',
      component: Link,
      to: '/tools/hubspot',
      coming: true
    },
    {
      icon: <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: 'Microsoft Teams',
      component: Link,
      to: '/tools/microsoft-teams',
      coming: true
    }
  ]
};