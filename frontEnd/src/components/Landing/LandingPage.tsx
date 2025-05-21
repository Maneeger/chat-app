import React from 'react';
import { MessageSquare, Users, Shield, ArrowRight } from 'lucide-react';
import AuthForms from '../Auth/AuthForms';

const LandingPage: React.FC = () => {
  const [showAuth, setShowAuth] = React.useState(false);

  const features = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Real-time Messaging",
      description: "Experience seamless communication with instant message delivery and typing indicators."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Group Chats",
      description: "Create and manage group conversations with friends, family, or colleagues."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Communication",
      description: "Your messages are protected with end-to-end encryption for maximum privacy."
    }
  ];

  if (showAuth) {
    return <AuthForms />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-950 via-teal-900 to-teal-800">
      <nav className="border-b border-gold-500/20 bg-teal-950/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-cream-100">Nexus Naija</h1>
            <button
              onClick={() => setShowAuth(true)}
              className="px-4 py-2 text-sm font-medium text-cream-100 hover:text-cream-50 
                       border border-gold-500 rounded-lg hover:border-gold-400 
                       transition-colors duration-200"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-cream-50 mb-6">
              Connect with Your Community
            </h2>
            <p className="text-xl text-cream-200 mb-12 max-w-2xl mx-auto">
              Experience the next generation of messaging with Nexus Naija. 
              Stay connected with friends and family in a secure and elegant environment.
            </p>
            <button
              onClick={() => setShowAuth(true)}
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-teal-950 
                       bg-cream-100 rounded-lg hover:bg-cream-50 transition-colors duration-200
                       shadow-lg shadow-gold-500/10"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>

          <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-gold-500/20 bg-teal-900/50 
                         backdrop-blur-sm shadow-xl shadow-gold-500/5"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-lg 
                              bg-cream-100/10 text-cream-100 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-cream-50 mb-3">
                  {feature.title}
                </h3>
                <p className="text-cream-200">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;