"";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Lock, Bell, Camera, Save, ShieldAlert, Mail, 
  Trash2, CreditCard, Plus, X, AlertTriangle, Check, Smartphone
} from "lucide-react";
// Đảm bảo đường dẫn này đúng với project của ông nhé
import { useAuthStore } from "@/store/authStore"; 

export default function Settings() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");
  
  // State cho Modal Xóa tài khoản
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  // State mock cho Tab Thông báo
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyPush, setNotifyPush] = useState(false);
  const [notifyPromo, setNotifyPromo] = useState(true);

  const tabs = [
    { id: "profile", label: "Thông tin cá nhân", icon: <User className="w-4 h-4" /> },
    { id: "security", label: "Bảo mật & Tài khoản", icon: <Lock className="w-4 h-4" /> },
    { id: "billing", label: "Thanh toán", icon: <CreditCard className="w-4 h-4" /> },
    { id: "notifications", label: "Thông báo", icon: <Bell className="w-4 h-4" /> },
  ];

  // Component Toggle Switch (Dùng cho tab thông báo)
  const ToggleSwitch = ({ active, onToggle }: { active: boolean; onToggle: () => void }) => (
    <button 
      onClick={onToggle}
      className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out flex items-center ${active ? 'bg-blue-600' : 'bg-slate-200'}`}
    >
      <motion.div
        initial={false}
        animate={{ x: active ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-4 h-4 bg-white rounded-full shadow-sm"
      />
    </button>
  );

  return (
    <div className="mx-auto space-y-8 pb-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-black text-slate-800 mb-2">Cài đặt tài khoản</h1>
        <p className="text-slate-500 font-medium uppercase tracking-wider text-xs font-bold">Cập nhật thông tin cá nhân và bảo mật</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* LEFT SIDEBAR - TABS */}
        <div className="w-full md:w-64 flex-shrink-0 flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all text-sm whitespace-nowrap ${
                activeTab === tab.id ? "text-blue-700 bg-blue-50/50" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="settings-active-tab"
                  className="absolute inset-0 bg-blue-50/80 rounded-xl border border-blue-100 -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* RIGHT CONTENT AREA */}
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: THÔNG TIN CÁ NHÂN */}
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-8"
              >
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                  Thông tin cá nhân
                </h2>

                <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
                  <div className="relative group cursor-pointer">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold shadow-md">
                      {user?.name?.charAt(0) || "M"}
                    </div>
                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white backdrop-blur-[2px]">
                      <Camera className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Ảnh đại diện</h3>
                    <p className="text-sm text-slate-500 mt-1 mb-3">Nên dùng ảnh vuông, dung lượng dưới 2MB.</p>
                    <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-xl transition-colors">
                      Tải ảnh lên
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Họ và tên học viên</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        defaultValue={user?.name || "Học viên Maco"}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 focus:border-blue-500 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Địa chỉ Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="email" 
                        defaultValue="hocvien@maco.vn"
                        disabled
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-500 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tiểu sử</label>
                    <textarea 
                      rows={3}
                      placeholder="Viết vài dòng về bản thân..."
                      className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 focus:border-blue-500 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none"
                    ></textarea>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
                  <button className="px-6 py-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl font-bold transition-all text-sm">
                    Hủy bỏ
                  </button>
                  <button className="px-6 py-2.5 bg-[#0B56D5] hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 text-sm">
                    <Save className="w-4 h-4" /> Lưu thay đổi
                  </button>
                </div>
              </motion.div>
            )}

            {/* TAB 2: BẢO MẬT & TÀI KHOẢN */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6"
                >
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
                    <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                    Thay đổi mật khẩu
                  </h2>

                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3 text-amber-800 text-sm">
                    <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                    <p>Mật khẩu của bạn nên dài ít nhất 8 ký tự, bao gồm cả chữ số và ký tự đặc biệt để đảm bảo an toàn.</p>
                  </div>
                  
                  <div className="space-y-5 max-w-md">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Mật khẩu hiện tại</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 focus:border-blue-500 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Mật khẩu mới</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 focus:border-blue-500 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold transition-all shadow-md text-sm">
                      Cập nhật mật khẩu
                    </button>
                  </div>
                </motion.div>

                {/* Khu vực Xóa Tài Khoản */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                  className="bg-red-50/50 rounded-3xl p-6 md:p-8 border border-red-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="text-lg font-bold text-red-600 mb-1">Xóa tài khoản</h3>
                    <p className="text-sm text-red-500/80 font-medium">Tất cả dữ liệu khóa học, chứng chỉ sẽ biến mất vĩnh viễn.</p>
                  </div>
                  <button 
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="px-6 py-2.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" /> Xóa tài khoản
                  </button>
                </motion.div>
              </div>
            )}

            {/* TAB 3: THANH TOÁN */}
            {activeTab === "billing" && (
              <motion.div
                key="billing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6"
              >
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                  Phương thức thanh toán
                </h2>
                
                <div className="border border-slate-200 rounded-2xl p-4 flex items-center justify-between group hover:border-blue-400 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">Visa kết thúc bằng 4242</p>
                      <p className="text-xs text-slate-500 font-medium">Hết hạn: 12/2028</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">Mặc định</div>
                </div>

                <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-bold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2 text-sm">
                  <Plus className="w-4 h-4" /> Thêm thẻ mới
                </button>
              </motion.div>
            )}

            {/* TAB 4: THÔNG BÁO */}
            {activeTab === "notifications" && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6"
              >
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                  Tùy chỉnh thông báo
                </h2>

                <div className="space-y-4">
                  {/* Item 1 */}
                  <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl"><Mail className="w-5 h-5" /></div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">Email hệ thống</p>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">Tiến độ học tập, bài tập được chấm điểm.</p>
                      </div>
                    </div>
                    <ToggleSwitch active={notifyEmail} onToggle={() => setNotifyEmail(!notifyEmail)} />
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl"><Smartphone className="w-5 h-5" /></div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">Push Notifications</p>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">Thông báo nhắc nhở học tập trên trình duyệt.</p>
                      </div>
                    </div>
                    <ToggleSwitch active={notifyPush} onToggle={() => setNotifyPush(!notifyPush)} />
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl"><Check className="w-5 h-5" /></div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">Khuyến mãi & Tin tức</p>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">Nhận mã giảm giá và khóa học mới nhất.</p>
                      </div>
                    </div>
                    <ToggleSwitch active={notifyPromo} onToggle={() => setNotifyPromo(!notifyPromo)} />
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* MODAL XÓA TÀI KHOẢN (Framer Motion) */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <>
            {/* Backdrop làm mờ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            
            {/* Nội dung Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-2xl z-50 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
              
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-xl font-black text-slate-800 mb-2">Bạn chắc chắn muốn xóa?</h3>
              <p className="text-sm text-slate-500 font-medium mb-6">
                Hành động này <span className="font-bold text-red-500">không thể hoàn tác</span>. Toàn bộ tiến độ học tập, chứng chỉ và các khóa học đã mua sẽ bị xóa vĩnh viễn khỏi hệ thống.
              </p>

              <div className="space-y-3 mb-8">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Nhập chữ <span className="text-slate-700">XOA</span> để xác nhận
                </label>
                <input 
                  type="text" 
                  placeholder="Nhập XOA..."
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-red-500 rounded-xl text-sm font-bold text-slate-800 outline-none transition-all focus:ring-4 focus:ring-red-500/10 text-center"
                />
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-3 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold transition-all text-sm"
                >
                  Hủy bỏ
                </button>
                <button 
                  disabled={deleteConfirmText !== "XOA"}
                  className="flex-1 py-3 text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold transition-all text-sm shadow-md shadow-red-500/20 flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Xóa vĩnh viễn
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}