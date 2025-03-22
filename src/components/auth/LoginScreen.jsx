import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Eye, EyeOff, Globe, Pencil } from 'lucide-react';

export default function LoginScreen() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [hostingProvider, setHostingProvider] = useState('Shareframe Social');
  const [showProviderModal, setShowProviderModal] = useState(false);
  const [activeTab, setActiveTab] = useState('shareframe');
  const [customServer, setCustomServer] = useState('');
  const [customServerError, setCustomServerError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const validateCustomServer = (server) => {
    const regex = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/;
    return regex.test(server);
  };

  const handleSetCustomServer = (server) => {
    setCustomServer(server);
    if (!validateCustomServer(server)) {
      setCustomServerError('Please enter a valid server address.');
    } else {
      setCustomServerError('');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here.
  };

  return (
    <div className="flex h-screen bg-[#121921] text-white overflow-hidden justify-center items-center relative">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="flex justify-center items-center absolute"
          >
            <img src="/logo_white.png" alt="ShareFrame Logo" className="w-56 h-auto" />
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="flex flex-col md:flex-row w-full relative"
          >
            {showProviderModal && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                <div className="bg-[#1E2732] rounded-xl p-6 w-96 shadow-xl">
                  <h2 className="text-lg font-semibold mb-4">Choose your account provider</h2>
                  <div className="flex gap-2 mb-4">
                    <Button
                      className={`flex-1 ${activeTab === 'shareframe' ? 'bg-[#394656]' : 'bg-[#2E3947]'}`}
                      onClick={() => setActiveTab('shareframe')}
                    >
                      Shareframe
                    </Button>
                    <Button
                      className={`flex-1 ${activeTab === 'custom' ? 'bg-[#394656]' : 'bg-[#2E3947]'}`}
                      onClick={() => setActiveTab('custom')}
                    >
                      Custom
                    </Button>
                  </div>
                  {activeTab === 'custom' && (
                    <div className="mb-4">
                      <label className="block text-sm text-gray-400 mb-1">Server address</label>
                      <Input
                        type="text"
                        placeholder="my-server.com"
                        value={customServer}
                        onChange={(e) => handleSetCustomServer(e.target.value)}
                        className="bg-[#2E3947] border-none text-gray-200 placeholder-gray-400"
                      />
                      {customServerError && <p className="text-sm mt-2 text-red-500">{customServerError}</p>}
                      <p className="text-sm mt-2 text-blue-500">https://shareframe.social</p>
                    </div>
                  )}
                  <div className="flex justify-end">
                    <Button
                      onClick={() => {
                        if (activeTab === 'custom' && customServer && validateCustomServer(customServer)) {
                          setHostingProvider(customServer);
                          setShowProviderModal(false);
                        } else if (activeTab === 'shareframe') {
                          setHostingProvider('Shareframe Social');
                          setShowProviderModal(false);
                        }
                      }}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Done
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="hidden md:flex md:w-1/2 justify-center items-center flex-col">
              <h2 className="text-4xl font-bold text-blue-500">Sign in</h2>
              <p className="text-gray-400 mt-2">Enter your username and password</p>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center">
              <form
                className="w-full max-w-md bg-[#1E2732] p-10 rounded-xl shadow-lg"
                onSubmit={handleLogin}
              >
                <div className="mb-4">
                  <label className="block text-sm text-gray-400 mb-1">Hosting provider</label>
                  <div
                    className="flex items-center justify-between bg-[#2E3947] rounded px-3 py-2 cursor-pointer"
                    onClick={() => setShowProviderModal(true)}
                  >
                    <span className="flex items-center gap-2"><Globe size={16} /> {hostingProvider}</span>
                    <Pencil size={16} />
                  </div>
                </div>

                <Input
                  type="text"
                  placeholder="Username or email address"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  className="mb-4 bg-[#2E3947] border-none text-gray-200 placeholder-gray-400"
                  required
                />

                <div className="relative mb-6">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[#2E3947] border-none text-gray-200 placeholder-gray-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-3 flex items-center"
                  >
                    {showPassword ? <EyeOff className="text-gray-400" /> : <Eye className="text-gray-400" />}
                  </button>
                </div>

                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg">
                  Next
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
