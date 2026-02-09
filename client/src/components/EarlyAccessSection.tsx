import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Check, AlertCircle } from 'lucide-react';

export default function EarlyAccessSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setStatus('error');
      setMessage('Please enter your email');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email');
      return;
    }

    setStatus('loading');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      setStatus('success');
      setMessage('You\'re on the list! Check your email for updates.');
      setEmail('');

      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="relative min-h-screen w-full py-24 flex items-center justify-center bg-gradient-to-b from-[#000000] to-[#111118] overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-96 bg-gradient-to-b from-[#FF7A18]/10 to-transparent blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <motion.h2
            className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Join Early Access
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed"
          >
            Be the first to experience the future of prescription management. Get exclusive early access and special founding member rates.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="relative"
          >
            <div className="relative flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#FF7A18] pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="your@email.com"
                  disabled={status === 'loading'}
                  className="w-full h-14 pl-12 pr-6 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#FF7A18]/50 focus:ring-1 focus:ring-[#FF7A18]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                whileHover={status !== 'loading' && status !== 'success' ? { scale: 1.02 } : {}}
                whileTap={status !== 'loading' && status !== 'success' ? { scale: 0.98 } : {}}
                className="h-14 px-8 bg-gradient-to-r from-[#FF7A18] to-[#FF9A4D] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#FF7A18]/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {status === 'loading' && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                )}
                {status === 'success' && <Check className="w-5 h-5" />}
                <span>{status === 'loading' ? 'Joining...' : status === 'success' ? 'Joined!' : 'Get Early Access'}</span>
              </motion.button>
            </div>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-2 text-sm font-medium ${
                  status === 'success' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {status === 'success' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                {message}
              </motion.div>
            )}
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/40 text-sm mt-6"
          >
            No spam, no nonsense. Just update about our launch.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 pt-20 border-t border-white/10 text-center"
        >
          <p className="text-white/40 text-sm">
            © 2026 Premium Prescription Service. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
