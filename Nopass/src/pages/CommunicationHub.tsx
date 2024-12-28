import React, { useState, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';

const CommunicationHub = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const { saveMessage, getMessages } = useDatabase();
  
  // Assuming we have a current user ID (you'll need to implement authentication)
  const currentUserId = 'user-1'; // Replace with actual user ID from auth

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const userMessages = await getMessages(currentUserId);
      setMessages(userMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    try {
      await saveMessage(currentUserId, message);
      setMessage('');
      await loadMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Message HR Team</h2>
            
            <div className="mb-4 max-h-96 overflow-y-auto">
              {messages.map((msg) => (
                <div key={msg._id} className="mb-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">{msg.content}</p>
                  <span className="text-xs text-gray-400">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full p-3 border rounded-lg mb-4 h-32 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                disabled={!message.trim()}
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Contacts</h2>
          <div className="space-y-4">
            {[
              { name: 'Wellness Coach', email: 'coach@company.com' },
              { name: 'HR Representative', email: 'hr@company.com' },
              { name: 'Support Team', email: 'support@company.com' },
            ].map((contact, index) => (
              <div key={index} className="flex items-start space-x-3">
                <MessageSquare className="w-5 h-5 text-indigo-600 mt-1" />
                <div>
                  <h3 className="font-medium">{contact.name}</h3>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationHub;