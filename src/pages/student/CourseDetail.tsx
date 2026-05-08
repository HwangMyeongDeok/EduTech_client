"use client";

import { motion } from "framer-motion";
import { PlayCircle, Clock, BookOpen, CheckCircle2, ChevronLeft, ShieldCheck } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

// Tích hợp shadcn/ui
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CourseDetail() {
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy ID khóa học từ URL

  return (
      <div className="pb-10 w-full space-y-8">      
      {/* Nút Back (UX: Tiện lợi không cần với tay lên trình duyệt) */}
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="text-slate-500 hover:text-[#0B56D5] hover:bg-blue-50 -ml-4"
      >
        <ChevronLeft className="w-4 h-4 mr-1" /> Quay lại
      </Button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* CỘT TRÁI: THÔNG TIN CHI TIẾT */}
        <div className="flex-1 space-y-8">
          
          {/* Header Info */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none mb-4">Học viên yêu thích</Badge>
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight mb-4">
              Phát triển Web với React & Next.js từ Zero đến Hero
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Khóa học toàn diện nhất giúp bạn làm chủ hệ sinh thái React, xây dựng ứng dụng Web hiện đại, chuẩn SEO và tối ưu hiệu suất với Next.js 14.
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2 text-slate-800">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>AT</AvatarFallback>
                </Avatar>
                <span className="font-bold">Trần Anh Tuấn</span>
              </div>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4"/> 10h 45m thời lượng</span>
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4"/> 34 Bài giảng</span>
            </div>
          </motion.div>

          {/* Bạn sẽ học được gì? (What you'll learn) */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Bạn sẽ học được gì?</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Hiểu sâu về React Core (State, Effect, Context)",
                "Nắm vững cơ chế Rendering của Next.js (SSR, SSG)",
                "Quản lý State toàn cục với Zustand",
                "Deploy ứng dụng thực tế lên Vercel"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-600 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nội dung khóa học (Curriculum) - Dùng Accordion của shadcn */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4">Nội dung khóa học</h2>
            <Accordion type="single" collapsible className="w-full bg-white rounded-2xl border border-slate-100 px-4">
              <AccordionItem value="item-1" className="border-b border-slate-100 last:border-none">
                <AccordionTrigger className="hover:no-underline font-bold text-slate-800 data-[state=open]:text-[#0B56D5]">
                  Chương 1: Khởi động với React
                </AccordionTrigger>
                <AccordionContent className="space-y-2 text-slate-600">
                  <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                    <span className="flex items-center gap-2"><PlayCircle className="w-4 h-4 text-[#0B56D5]" /> Giới thiệu khóa học</span>
                    <span className="text-xs text-slate-400">05:12</span>
                  </div>
                  <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                    <span className="flex items-center gap-2"><PlayCircle className="w-4 h-4 text-[#0B56D5]" /> Cài đặt môi trường</span>
                    <span className="text-xs text-slate-400">12:30</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-none">
                <AccordionTrigger className="hover:no-underline font-bold text-slate-800 data-[state=open]:text-[#0B56D5]">
                  Chương 2: Hooks & State Management
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 italic px-2">
                  (Danh sách bài học khóa lại, cần đăng ký để xem)
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* CỘT PHẢI: STICKY CHECKOUT CARD */}
    <div className="w-full lg:w-[400px] flex-shrink-0">
  <div className="sticky top-24">
    <Card className="rounded-3xl border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden">
      
      {/* Phần Thumbnail/Video */}
      <div className="w-full aspect-video bg-teal-500 relative flex items-center justify-center">
        <span className="text-7xl drop-shadow-xl">⚛️</span> {/* Tăng nhẹ icon cho hợp với khung to */}
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center cursor-pointer hover:bg-black/20 transition-colors">
          <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
            <PlayCircle className="w-7 h-7 text-teal-600 fill-current" />
          </div>
        </div>
      </div>

      <CardContent className="p-8"> {/* Tăng padding từ p-6 lên p-8 cho thoáng */}
        <div className="text-3xl font-black text-[#0B56D5] mb-6">Miễn phí</div>
        
        <Button 
          onClick={() => navigate('/student/course/react-123')}
          className="w-full h-14 text-lg font-bold bg-[#0B56D5] hover:bg-blue-700 rounded-2xl mb-6 shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
        >
          Bắt đầu học ngay
        </Button>

        <div className="space-y-4 text-sm text-slate-600 font-medium pb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-500"/>
            </div>
            <span>Truy cập trọn đời</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-emerald-500"/>
            </div>
            <span>Cập nhật nội dung liên tục</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</div>
      </div>
    </div>
  );
}