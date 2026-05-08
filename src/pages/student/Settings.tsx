"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Bell, Camera, Save, ShieldAlert } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function Settings() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Hồ sơ cá nhân", icon: <User className="w-4 h-4" /> },
    { id: "security", label: "Bảo mật", icon: <Lock className="w-4 h-4" /> },
    { id: "notifications", label: "Thông báo", icon: <Bell className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-black text-slate-800 mb-2">Cài đặt tài khoản</h1>
        <p className="text-slate-500 font-medium">Quản lý thông tin cá nhân và tùy chọn bảo mật của bạn.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Sidebar - Tabs */}
        <div className="w-full md:w-64 flex-shrink-0 flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
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

        {/* Right Content Area */}
        <div className="flex-1 bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <AnimatePresence mode="wait">
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Avatar Uploader */}
                <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
                  <div className="relative group cursor-pointer">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold shadow-md">
                      {user?.name?.charAt(0) || "U"}
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

                {/* Form Fields (shadcn inspired) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Họ và tên</label>
                    <input 
                      type="text" 
                      defaultValue={user?.name}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email</label>
                    <input 
                      type="email" 
                      defaultValue="student@maco.edu.vn"
                      disabled
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-slate-700">Tiểu sử</label>
                    <textarea 
                      rows={4}
                      placeholder="Viết vài dòng về bản thân..."
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none"
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button className="px-6 py-2.5 bg-[#0B56D5] hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md shadow-blue-500/20 flex items-center gap-2">
                    <Save className="w-4 h-4" /> Lưu thay đổi
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3 text-amber-800 text-sm">
                  <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                  <p>Mật khẩu của bạn nên dài ít nhất 8 ký tự, bao gồm cả chữ số và ký tự đặc biệt để đảm bảo an toàn.</p>
                </div>
                
                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Mật khẩu hiện tại</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Mật khẩu mới</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Xác nhận mật khẩu mới</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" />
                  </div>
                </div>

                <div className="pt-4">
                  <button className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl font-bold transition-all shadow-md flex items-center gap-2">
                    Cập nhật mật khẩu
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}