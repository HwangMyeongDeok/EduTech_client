import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { 
  User, ShieldCheck, Wallet, Package, 
  Camera, Save, CheckCircle2, KeyRound, 
  Smartphone, Building2, Receipt, Star, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TABS = [
  { id: "profile", label: "Hồ sơ cá nhân", icon: User },
  { id: "security", label: "Bảo mật & 2FA", icon: ShieldCheck },
  { id: "billing", label: "Ví & Thanh toán", icon: Wallet },
  { id: "plan", label: "Gói Instructor", icon: Package },
];

// --- THÊM TYPE VARIANTS CHUẨN TYPESCRIPT ---
const containerVariants: Variants = { 
  hidden: { opacity: 0 }, 
  show: { opacity: 1, transition: { staggerChildren: 0.1 } } 
};

const itemVariants: Variants = { 
  hidden: { opacity: 0, y: 20 }, 
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } 
};

const tabContentVariants: Variants = { 
  hidden: { opacity: 0, x: 20 }, 
  enter: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
};

export default function InstructorSettingsContent() {
  const [activeTab, setActiveTab] = useState("security"); // Mặc định mở tab Profile hoặc tùy ý
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Giả lập hàm lưu dữ liệu dùng chung
  const handleSave = () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="w-full bg-slate-50/50 font-sans min-h-screen">
      <motion.div 
        className="mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight uppercase">Cài đặt tài khoản</h2>
          <p className="text-slate-500 font-medium mt-2">Quản lý hồ sơ chuyên gia, bảo mật và các tùy chọn thanh toán.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* ================= SIDEBAR TABS ================= */}
          <motion.div variants={itemVariants} className="w-full lg:w-72 shrink-0 flex flex-col gap-2">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${
                    isActive 
                      // Đã đổi sang blue-600 thay vì indigo
                      ? "bg-white text-blue-600 shadow-sm border border-slate-200/60" 
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-800 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                    {tab.label}
                  </div>
                  {isActive && (
                    <motion.div layoutId="activeTabIndicator" className="w-2 h-2 rounded-full bg-blue-600" />
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* ================= MAIN CONTENT AREA ================= */}
          <div className="flex-1 w-full min-w-0">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: HỒ SƠ CÁ NHÂN */}
              {activeTab === "profile" && (
                <motion.div key="profile" variants={tabContentVariants} initial="hidden" animate="enter" exit="exit" className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10 pb-10 border-b border-slate-100">
                    <div className="relative group cursor-pointer">
                      <div className="w-28 h-28 rounded-full bg-blue-50 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                        <User className="w-12 h-12 text-blue-400" />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Camera className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:bg-blue-600 transition-colors">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-center md:text-left space-y-2">
                      <h3 className="text-xl font-black text-slate-800">Ảnh đại diện Giảng viên</h3>
                      <p className="text-sm font-medium text-slate-500">Ảnh này sẽ hiển thị trên các khóa học của bạn.</p>
                      <div className="flex items-center justify-center md:justify-start gap-2 pt-1">
                        <Badge variant="secondary" className="bg-slate-100 text-slate-500 font-bold">JPG, PNG</Badge>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-500 font-bold">MAX 5MB</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Tên hiển thị</label>
                        <input type="text" defaultValue="Giảng Viên IT" className="w-full h-12 px-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"/>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Lĩnh vực chuyên môn</label>
                        <input type="text" defaultValue="Backend Developer & AI Specialist" className="w-full h-12 px-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"/>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Giới thiệu ngắn (BIO)</label>
                      <textarea defaultValue="Hơn 5 năm kinh nghiệm trong phát triển Java Spring Boot và tích hợp AI. Đam mê chia sẻ kiến thức công nghệ mới đến cộng đồng." rows={4} className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 leading-relaxed outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"/>
                    </div>
                  </div>
                  
                  <div className="flex flex-col-reverse sm:flex-row items-center justify-between mt-10 pt-6 border-t border-slate-100 gap-4">
                    <span className="text-xs font-semibold text-slate-400">Lần cập nhật cuối cùng: Hôm nay</span>
                    <SaveButton isSaving={isSaving} saveSuccess={saveSuccess} onClick={handleSave} />
                  </div>
                </motion.div>
              )}

              {/* TAB 2: BẢO MẬT & 2FA */}
              {activeTab === "security" && (
                <motion.div key="security" variants={tabContentVariants} initial="hidden" animate="enter" exit="exit" className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-10">
                  {/* Đổi mật khẩu */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><KeyRound className="w-5 h-5" /></div>
                      <div>
                        <h3 className="text-lg font-black text-slate-800">Đổi mật khẩu</h3>
                        <p className="text-sm font-medium text-slate-500">Đảm bảo tài khoản của bạn sử dụng mật khẩu mạnh.</p>
                      </div>
                    </div>
                    <div className="space-y-4 max-w-lg">
                      <input type="password" placeholder="Mật khẩu hiện tại" className="w-full h-12 px-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"/>
                      <input type="password" placeholder="Mật khẩu mới" className="w-full h-12 px-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"/>
                      <input type="password" placeholder="Xác nhận mật khẩu mới" className="w-full h-12 px-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"/>
                      <Button onClick={handleSave} className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-6 h-11 font-bold shadow-md">Cập nhật mật khẩu</Button>
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* 2FA */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Smartphone className="w-5 h-5" /></div>
                      <div>
                        <h3 className="text-lg font-black text-slate-800">Xác thực 2 yếu tố (2FA)</h3>
                        <p className="text-sm font-medium text-slate-500">Bảo vệ tài khoản bằng ứng dụng Authenticator.</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-5 border border-slate-200 rounded-2xl bg-slate-50/50">
                      <div className="pr-4">
                        <p className="font-bold text-slate-800 mb-1">Trạng thái: <span className="text-emerald-600">Đang bật</span></p>
                        <p className="text-sm font-medium text-slate-500">Tài khoản của bạn đang được bảo vệ an toàn.</p>
                      </div>
                      <Button variant="outline" className="font-bold border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200">Tắt 2FA</Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: VÍ & THANH TOÁN */}
              {activeTab === "billing" && (
                <motion.div key="billing" variants={tabContentVariants} initial="hidden" animate="enter" exit="exit" className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-10">
                  {/* Bank Account */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Building2 className="w-5 h-5" /></div>
                      <div>
                        <h3 className="text-lg font-black text-slate-800">Tài khoản nhận tiền</h3>
                        <p className="text-sm font-medium text-slate-500">Nơi nhận doanh thu bán khóa học hàng tháng.</p>
                      </div>
                    </div>
                    <div className="p-6 border border-slate-200 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-6 opacity-10">
                         <Building2 className="w-24 h-24" />
                      </div>
                      <div className="relative z-10">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Ngân hàng Techcombank</p>
                        <h4 className="text-2xl font-black tracking-widest mb-4">1903 4567 8910 11</h4>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Chủ tài khoản</p>
                            <p className="font-bold uppercase tracking-wider">NGUYEN VAN A</p>
                          </div>
                          <Button size="sm" variant="secondary" className="bg-white/10 hover:bg-white/20 text-white font-bold border-none">
                            Thay đổi
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Lịch sử */}
                  <div>
                     <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-slate-100 text-slate-600 rounded-lg"><Receipt className="w-5 h-5" /></div>
                      <div>
                        <h3 className="text-lg font-black text-slate-800">Lịch sử rút tiền</h3>
                        <p className="text-sm font-medium text-slate-500">Các giao dịch gần đây của bạn.</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[
                        { date: "15/05/2026", amount: "12,500,000đ", status: "Thành công" },
                        { date: "15/04/2026", amount: "8,200,000đ", status: "Thành công" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-800">Rút tiền về Techcombank</p>
                              <p className="text-sm font-medium text-slate-500">{item.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-black text-slate-800">{item.amount}</p>
                            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">{item.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: GÓI INSTRUCTOR */}
              {activeTab === "plan" && (
                <motion.div key="plan" variants={tabContentVariants} initial="hidden" animate="enter" exit="exit" className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="text-center max-w-lg mx-auto mb-10">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800">Gói hiện tại của bạn</h3>
                    <p className="text-slate-500 font-medium mt-2">Nâng cấp để mở khóa các tính năng AI mạnh mẽ và tăng tỷ lệ chia sẻ doanh thu.</p>
                  </div>

                  <div className="border-2 border-blue-600 rounded-3xl p-8 bg-blue-50/30 relative">
                    <div className="absolute top-0 right-8 -translate-y-1/2 bg-blue-600 text-white text-xs font-black uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg shadow-blue-600/30">
                      Đang sử dụng
                    </div>
                    <div className="flex justify-between items-end mb-8 border-b border-blue-100 pb-8">
                      <div>
                        <h4 className="text-3xl font-black text-slate-800 flex items-center gap-2">
                          Creator PRO <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                        </h4>
                        <p className="font-medium text-slate-600 mt-1">Tối đa hóa doanh thu của bạn</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-black text-blue-600">85%</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Chia sẻ doanh thu</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {[
                        "Không giới hạn số lượng học viên",
                        "Tính năng tạo Quiz bằng AI (Không giới hạn)",
                        "Phân tích dữ liệu học viên chuyên sâu",
                        "Hỗ trợ kỹ thuật ưu tiên 24/7",
                        "Tùy chỉnh chứng chỉ học viên",
                        "Marketing Push từ hệ thống"
                      ].map((benefit, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                          <span className="font-semibold text-slate-700 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 rounded-xl font-black shadow-lg shadow-slate-900/20 text-base">
                      Nâng cấp lên gói ULTRA (95% Doanh thu)
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

// Sub-component Nút Lưu để code gọn gàng
function SaveButton({ isSaving, saveSuccess, onClick }: { isSaving: boolean, saveSuccess: boolean, onClick: () => void }) {
  return (
    <div className="flex items-center gap-3 w-full sm:w-auto">
      {saveSuccess && (
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-1.5 text-sm font-bold text-emerald-600">
          <CheckCircle2 className="w-4 h-4" /> Đã lưu
        </motion.div>
      )}
      <Button 
        onClick={onClick} 
        disabled={isSaving}
        className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-8 h-12 font-black shadow-lg shadow-slate-900/20 transition-all disabled:opacity-70"
      >
        {isSaving ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        ) : (
          <><Save className="w-4 h-4 mr-2" /> LƯU THAY ĐỔI</>
        )}
      </Button>
    </div>
  );
}