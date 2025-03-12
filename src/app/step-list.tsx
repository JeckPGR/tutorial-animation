"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import AnimatedStep from "./animated-step"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown, Trophy } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function StepList() {
  const [activeStep, setActiveStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [autoAdvance, setAutoAdvance] = useState(true)
  const [showCompletionDialog, setShowCompletionDialog] = useState(false)
  const [allCompleted, setAllCompleted] = useState(false)

  const steps = [
    { id: 1, title: "Register / Daftar Akun", description: "Buat akun baru untuk mulai menggunakan layanan booking barbershop"},
    { id: 2, title: "Login", description: "Masuk ke akun Anda dengan email dan password yang telah didaftarkan" },
    { id: 3, title: "Buka Page Booking", description: "Akses halaman booking untuk memulai proses reservasi" },
    { id: 4, title: "Pilih Lokasi", description: "Tentukan kota tempat Anda ingin melakukan booking" },
    { id: 5, title: "Pilih Outlet", description: "Pilih outlet barbershop yang ingin Anda kunjungi" },
    {
      id: 6,
      title: "Pilih Jasa / Layanan",
      description: "Pilih layanan yang ingin Anda gunakan seperti potong rambut, shaving, dll",
    },
    {
      id: 7,
      title: "Pilih Barberman",
      description: "Pilih barberman yang akan melayani Anda berdasarkan keahlian dan rating",
    },
    { id: 8, title: "Pilih Hari dan Waktu", description: "Tentukan tanggal dan waktu untuk reservasi Anda" },
    { id: 9, title: "Konfirmasi", description: "Periksa detail booking Anda sebelum melanjutkan ke pembayaran" },
    { id: 10, title: "Pilih Metode Pembayaran", description: "Pilih metode pembayaran yang ingin Anda gunakan" },
    { id: 11, title: "Reservasi Terbuat", description: "Reservasi Anda telah berhasil dibuat dan menunggu pembayaran" },
    {
      id: 12,
      title: "Selesaikan Pembayaran dengan Bukti",
      description: "Transfer pembayaran dan unggah bukti untuk mengkonfirmasi reservasi",
    },
  ]

  const handleNext = () => {
    if (activeStep < steps.length) {
      const newCompletedSteps = [...completedSteps, activeStep];
      setCompletedSteps(newCompletedSteps)
      setActiveStep(activeStep + 1)
    } else if (activeStep === steps.length) {
      // Tandain last step udah  selesai belum jika belum
      if (!completedSteps.includes(steps.length)) {
        const newCompletedSteps = [...completedSteps, steps.length];
        setCompletedSteps(newCompletedSteps)
        
        // Menampilkan dialog setelah langkah terakhir selesai
        setTimeout(() => {
          setShowCompletionDialog(true)
          // Tambahkan Logic Jika sudah Login/Authenticate ke page Booking, jika belum ke page Login
          // const isLoggedIn = utils ambil true sudah login or false
          //   if (isLoggedIn) {
          //     router.push("/booking");
          //   } else {
          //     router.push("/login");
          //   }
        }, 500)
      }
    } else{
    }
  }

  const handlePrevious = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1)
    }
  }

  const handleStepClick = (stepId: number) => {
  
    if (
      completedSteps.includes(stepId) || 
      stepId === activeStep || 
      stepId === activeStep + 1 
    ) {
      setActiveStep(stepId)
      
     
      if (stepId === activeStep + 1 && !completedSteps.includes(activeStep)) {
        const newCompletedSteps = [...completedSteps, activeStep];
        setCompletedSteps(newCompletedSteps)
        
        // Jika sudah sampe last step
        if (activeStep === steps.length) {
          setAllCompleted(true)
          setTimeout(() => {
            setShowCompletionDialog(true)
                // Tambahkan Logic Jika sudah Login/Authenticate ke page Booking, jika belum ke page Login
          // const isLoggedIn = utils ambil true sudah login or false
          //   if (isLoggedIn) {
          //     router.push("/booking");
          //   } else {
          //     router.push("/login");
          //   }
          }, 500)
        }
      }
    }
  }

  const handleStepComplete = () => {
    // Hanya auto-advance jika belum selesai semua langkah
    if (!allCompleted) {
      handleNext()
    }
  }

  // Scroll to top button
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Scroll to bottom button
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
  }

  return (
    <div className="w-full mx-auto lg:px-20 sm:px-12 px-5 pb-24 md:pt-8 pt-6  bg-white ">
      {/* Completion Dialog */}
      <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
              <Trophy className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl">Selamat!</DialogTitle>
            <DialogDescription className="text-center">
              Anda telah berhasil menyelesaikan semua langkah tutorial booking barbershop.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <p className="text-center text-sm text-gray-500">
              Sekarang Anda siap untuk menggunakan aplikasi booking barbershop dengan lancar. Terima kasih telah
              mengikuti tutorial ini.
            </p>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button
              type="button"
              className="bg-black hover:bg-black/80 text-white w-full
              "
              // Tambahkan Logic Jika sudah Login/Authenticate ke page Booking, jika belum ke page Login
              onClick={() => setShowCompletionDialog(false)}
            >
              Booking Sekarang !
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mb-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 text-center">Tutorial Booking Barbershop</h2>
        <p className="text-gray-600 text-center">Ikuti langkah-langkah berikut untuk membuat reservasi</p>

        <div className="mt-4 flex items-center justify-center">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={autoAdvance}
              onChange={() => setAutoAdvance(!autoAdvance)}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-400 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
            <span className="ms-3 text-sm font-medium text-gray-700">Automatis baca 4 detik</span>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step) => (
          <AnimatedStep
            key={step.id}
            step={step}
            isActive={activeStep === step.id}
            isCompleted={completedSteps.includes(step.id)}
            onClick={() => handleStepClick(step.id)}
            autoAdvance={autoAdvance && !allCompleted}
            onComplete={handleStepComplete}
            disableProgress={allCompleted}
          />
        ))}
      </div>
    
      <div className="mt-7 flex w-full justify-center items-center"> 
        <p className="text-md text-gray-500 font-semibold">Created by Jecky</p>
      </div>

      {/* Sticky navigation controls */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-3xl mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline" onClick={scrollToTop} className="rounded-full">
              <ChevronUp size={18} />
            </Button>
            <Button size="icon" variant="outline" onClick={scrollToBottom} className="rounded-full">
              <ChevronDown size={18} />
            </Button>
          </div>

          <div className="text-xs md:text-sm text-gray-500">
            Langkah {activeStep} dari {steps.length}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrevious} disabled={activeStep === 1} className="px-4 text-xs">
              Sebelumnya
            </Button>

            <Button
              onClick={handleNext}
              className="bg-black hover:bg-black/80 indigo-700 px-4 text-xs"
            >
              {activeStep === steps.length ? "Booking" : "Selanjutnya"}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}