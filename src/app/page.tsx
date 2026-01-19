"use client"; // WAJIB untuk Task 1 & 2 agar bisa baca MetaMask

import { useState, useEffect } from "react";
// Pastikan path import ini sesuai dengan lokasi file blockchain.js kamu
import { getStoredValue, updateStoredValue } from "./utils/blockchain"; 

export default function Home() {
  const [angka, setAngka] = useState<string>("0");
  const [inputBaru, setInputBaru] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Task 1: Ambil data dari blockchain saat halaman dimuat
  const loadData = async () => {
    try {
      const data = await getStoredValue();
      if (data) setAngka(data);
    } catch (error) {
      console.error("Gagal memuat data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Task 2: Update data di blockchain melalui Wallet
  const handleUpdate = async () => {
    if (!inputBaru) return alert("Isi angka dulu!");
    
    setLoading(true);
    try {
      await updateStoredValue(inputBaru);
      alert("Transaksi Berhasil!");
      await loadData(); // Data terbaru terbaca kembali (Sync UI)
    } catch (error) {
      console.error("Update gagal:", error);
      alert("Transaksi Gagal!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: "50px", fontFamily: "sans-serif" }}>
      <h1>Avalanche L1 DApp - Task Integration</h1>
      <hr />
      
      <div style={{ marginTop: "20px" }}>
        {/* Task 1: Data blockchain tampil di UI */}
        <h3>Nilai Terimpan: <span style={{ color: "blue" }}>{angka}</span></h3>
      </div>

      <div style={{ marginTop: "20px" }}>
        {/* Task 2: Input & Button untuk update state */}
        <input 
          type="number" 
          value={inputBaru}
          onChange={(e) => setInputBaru(e.target.value)} 
          placeholder="Masukkan angka baru"
          style={{ padding: "8px", marginRight: "10px", color: "black" }}
        />
        
        <button 
          onClick={handleUpdate} 
          disabled={loading}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          {loading ? "Proses..." : "Update ke Blockchain"}
        </button>
      </div>

      <p style={{ marginTop: "30px", fontSize: "12px", color: "gray" }}>
        
      </p>
    </main>
  );
}