import { motion } from "framer-motion";

interface WelcomeHeaderProps {
  name?: string;
}

export function WelcomeHeader({ name }: WelcomeHeaderProps) {
  // Lấy tên cuối cùng của người dùng để chào hỏi thân mật hơn
  const firstName = name?.split(' ').pop() || 'bạn';

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-1"
    >
      <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
        Chào mừng trở lại, {firstName}! 
        <motion.span 
          animate={{ rotate: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
          className="text-3xl md:text-4xl origin-bottom-right inline-block"
        >
          👋
        </motion.span>
      </h1>
      <p className="text-slate-500 font-medium text-sm md:text-base">
        Hôm nay là một ngày tuyệt vời để học thêm điều mới.
      </p>
    </motion.div>
  );
}