-- Database: mitraclima
-- SQL script to seed the database

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cat VARCHAR(100),
  type VARCHAR(100),
  brand VARCHAR(100),
  method VARCHAR(100),
  power NUMERIC,
  kw NUMERIC,
  phase VARCHAR(50),
  voltage VARCHAR(50),
  components INTEGER,
  price NUMERIC,
  features JSONB,
  parts JSONB
);

CREATE TABLE IF NOT EXISTS components (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  supplier VARCHAR(100),
  price NUMERIC,
  description TEXT,
  tag VARCHAR(100)
);

TRUNCATE TABLE products RESTART IDENTITY CASCADE;
TRUNCATE TABLE components RESTART IDENTITY CASCADE;

INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Motor Control Panel 0.75kW', 'PANEL MOTOR', 'motor', 'CHINT', 'DOL', 0.75, 0.75, '3-Phase', '380V', 9, 1261938, '["Main Breaker","Kontaktor Utama","Proteksi Overload"]', '[{"name":"NXB-63 3P C4 6kA (CHINT)","qty":1,"price":"Rp 150.458","notes":"Main Breaker"},{"name":"NXC-09 220V 9A (CHINT)","qty":1,"price":"Rp 156.542","notes":"Kontaktor Utama"},{"name":"NXR-25 1.25–2A (CHINT)","qty":1,"price":"Rp 205.302","notes":"Proteksi Overload"},{"name":"Pilot Lamp 22mm Red (FORT)","qty":1,"price":"Rp 16.200","notes":"Indikator Run"},{"name":"Pilot Lamp 22mm Green (FORT)","qty":1,"price":"Rp 16.200","notes":"Indikator Stop"},{"name":"Push Button 22mm Green (FORT)","qty":1,"price":"Rp 17.800","notes":"Start"},{"name":"Push Button 22mm Red (FORT)","qty":1,"price":"Rp 17.800","notes":"Stop"},{"name":"Panel Box 35×25×15 Indoor (FORT)","qty":1,"price":"Rp 290.000","notes":"Enclosure"},{"name":"Engineering & Wiring","qty":1,"price":"Rp 391.636","notes":"Jasa rakit, wiring, kabel, terminal, aksesori, testing & QC"}]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Motor Control Panel 1.1kW', 'PANEL MOTOR', 'motor', 'CHINT', 'DOL', 1.1, 1.1, '3-Phase', '380V', 9, 1261938, '["Main Breaker","Kontaktor Utama","Proteksi Overload"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Motor Control Panel 1.5kW', 'PANEL MOTOR', 'motor', 'CHINT', 'DOL', 1.5, 1.5, '3-Phase', '380V', 9, 1241217, '["Main Breaker","Kontaktor Utama","Proteksi Overload"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Motor Control Panel 2.2kW', 'PANEL MOTOR', 'motor', 'CHINT', 'DOL', 2.2, 2.2, '3-Phase', '380V', 9, 1330000, '["Main Breaker","Kontaktor Utama","Proteksi Overload"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Motor Control Panel 3kW', 'PANEL MOTOR', 'motor', 'CHINT', 'DOL', 3, 3, '3-Phase', '380V', 9, 1450000, '["Main Breaker","Kontaktor Utama","Proteksi Overload"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Motor Control Panel 4kW', 'PANEL MOTOR', 'motor', 'SCHNEIDER', 'DOL', 4, 4, '3-Phase', '380V', 9, 1780000, '["Main Breaker","Kontaktor Utama","Proteksi Overload"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Motor Control Panel 5.5kW', 'PANEL MOTOR', 'motor', 'SCHNEIDER', 'DOL', 5.5, 5.5, '3-Phase', '380V', 9, 2450000, '["Main Breaker","Kontaktor Utama","Proteksi Overload","Pilot Lamp"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Motor Control Panel 7.5kW', 'PANEL MOTOR', 'motor', 'CHINT', 'DOL', 7.5, 7.5, '3-Phase', '380V', 10, 2890000, '["Main Breaker","Kontaktor Utama","Proteksi Overload","Pilot Lamp"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Motor Control Panel 11kW Star-Delta', 'PANEL MOTOR', 'motor', 'CHINT', 'Star-Delta', 11, 11, '3-Phase', '380V', 12, 4150000, '["Main Breaker","Kontaktor Star","Kontaktor Delta","Timer","Proteksi Overload"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Motor Control Panel 15kW Star-Delta', 'PANEL MOTOR', 'motor', 'SCHNEIDER', 'Star-Delta', 15, 15, '3-Phase', '380V', 12, 5600000, '["Main Breaker","Kontaktor Star","Kontaktor Delta","Timer","Proteksi Overload"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Motor Control Panel 18.5kW Star-Delta', 'PANEL MOTOR', 'motor', 'CHINT', 'Star-Delta', 18.5, 18.5, '3-Phase', '380V', 13, 6400000, '["Main Breaker","Kontaktor Star","Kontaktor Delta","Timer","Proteksi Overload"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Motor Control Panel 22kW Star-Delta', 'PANEL MOTOR', 'motor', 'WECON', 'Star-Delta', 22, 22, '3-Phase', '380V', 13, 7800000, '["Main Breaker","Kontaktor Star","Kontaktor Delta","Timer","Proteksi Overload","Pilot Lamp"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Panel Distribusi 3 Phase 63A', 'PANEL DISTRIBUSI', 'distribusi', 'CHINT', 'Distribusi', 0, 0, '3-Phase', '380V', 8, 2800000, '["MCB 3 Phase","Busbar","Terminal"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Panel Distribusi 3 Phase 100A', 'PANEL DISTRIBUSI', 'distribusi', 'CHINT', 'Distribusi', 0, 0, '3-Phase', '380V', 10, 3900000, '["MCCB 100A","Busbar","Terminal","Pilot Lamp"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Panel Distribusi 3 Phase 160A', 'PANEL DISTRIBUSI', 'distribusi', 'SCHNEIDER', 'Distribusi', 0, 0, '3-Phase', '380V', 12, 5200000, '["MCCB 160A","Busbar","Terminal","Pilot Lamp","Amperemeter"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Panel Distribusi 3 Phase 250A', 'PANEL DISTRIBUSI', 'distribusi', 'SCHNEIDER', 'Distribusi', 0, 0, '3-Phase', '380V', 14, 8500000, '["MCCB 250A","Busbar","Terminal","Voltmeter","Amperemeter","KWh Meter"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Panel Distribusi 1 Phase 32A', 'PANEL DISTRIBUSI', 'distribusi', 'CHINT', 'Distribusi', 0, 0, '1-Phase', '220V', 6, 1200000, '["MCB 1 Phase","Busbar","Terminal"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Panel Distribusi 1 Phase 63A', 'PANEL DISTRIBUSI', 'distribusi', 'CHINT', 'Distribusi', 0, 0, '1-Phase', '220V', 7, 1650000, '["MCB 1 Phase","Busbar","Terminal"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Motor Control Panel 30kW DOL', 'PANEL MOTOR', 'motor', 'HONEYWELL', 'DOL', 30, 30, '3-Phase', '380V', 11, 9200000, '["Main Breaker","Kontaktor Utama","Proteksi Overload","Amperemeter"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Motor Control Panel 37kW Star-Delta', 'PANEL MOTOR', 'motor', 'SIEMENS', 'Star-Delta', 37, 37, '3-Phase', '380V', 14, 12500000, '["Main Breaker","Kontaktor Star","Kontaktor Delta","Timer","Proteksi Overload","Amperemeter"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Motor Control Panel 45kW Star-Delta', 'PANEL MOTOR', 'motor', 'SIEMENS', 'Star-Delta', 45, 45, '3-Phase', '380V', 15, 15800000, '["Main Breaker","Kontaktor Star","Kontaktor Delta","Timer","Proteksi Overload","KWh Meter"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Motor Control Panel 55kW Star-Delta', 'PANEL MOTOR', 'motor', 'WECON', 'Star-Delta', 55, 55, '3-Phase', '380V', 16, 19200000, '["Main Breaker","Kontaktor Star","Kontaktor Delta","Timer","Proteksi Overload","KWh Meter","Pilot Lamp"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Motor Control Panel 5.5kW DOL', 'PANEL MOTOR', 'motor', 'WECON', 'DOL', 5.5, 5.5, '3-Phase', '380V', 10, 2320000, '["Main Breaker","Kontaktor Utama","Proteksi Overload","Pilot Lamp"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Panel Distribusi 3 Phase 63A', 'PANEL DISTRIBUSI', 'distribusi', 'HONEYWELL', 'Distribusi', 0, 0, '3-Phase', '380V', 8, 2520000, '["MCB 3 Phase","Busbar","Terminal","Pilot Lamp"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Panel Kontrol Soft Starter', 'PANEL KONTROL', 'controls', 'DELTA', 'Soft-Starter', 0, 0, '3-Phase', '380V', 8, 3200000, '["Soft Starter","Proteksi Overload","Kontaktor"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Panel Kontrol VFD', 'PANEL KONTROL', 'controls', 'INVT', 'VFD', 0, 0, '3-Phase', '380V', 9, 4500000, '["Variable Frequency Drive","Kontrol Kecepatan","Proteksi Termal"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Panel Kontrol PLC', 'PANEL KONTROL', 'controls', 'OMRON', 'PLC', 0, 0, '3-Phase', '380V', 7, 2800000, '["PLC","I/O Expansion","HMI Support"]', '[]');
INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES ('Panel Remote Monitoring', 'PANEL KONTROL', 'controls', 'CUSTOM', 'Monitoring', 0, 0, '3-Phase', '380V', 6, 1050000, '["GSM/Cloud","Alarm","Data Logger"]', '[]');

INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Miniature Circuit Breaker (MCB) 1P 6A', 'MCB', 'CHINT', 45000, 'Proteksi arus lebih untuk sirkuit kontrol dan instalasi ringan.', 'MCB');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Moulded Case Circuit Breaker (MCCB) 100A', 'MCCB', 'SCHNEIDER', 1250000, 'Proteksi utama panel distribusi dengan trip akurat untuk beban 3 phase.', 'MCCB');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Kontaktor Magnetik 3P 32A', 'KONTAKTOR', 'CHINT', 275000, 'Kontaktor handal untuk kontrol motor, pemanas, dan sistem otomatisasi.', 'KONTAKTOR');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Thermal Overload Relay 12-18A', 'RELAY', 'FORT', 295000, 'Penyaring arus motor untuk proteksi beban berlebih dan sistem star-delta.', 'RELAY');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Variable Frequency Drive (VFD) 5.5kW', 'VFD', 'SCHNEIDER', 4500000, 'Kontrol kecepatan motor presisi tinggi dan hemat energi melalui inverter VFD.', 'VFD');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Kontaktor 4P 65A Tugas Berat', 'KONTAKTOR', 'SIEMENS', 1255000, 'Kontaktor industrial kuat untuk kontrol beban berat dengan siklus tinggi.', 'KONTAKTOR');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('MCB 3 Phase 63A', 'MCB', 'CHINT', 288000, 'MCB 3 fasa untuk proteksi instalasi listrik daya menengah.', 'MCB');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('MCCB 3 Phase 250A Adjustable', 'MCCB', 'SCHNEIDER', 2450000, 'MCCB kapasitas besar dengan pengaturan batas arus untuk panel utama (LVMDP).', 'MCCB');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Solid State Relay (SSR) 40A', 'RELAY', 'WECON', 305000, 'Relay tanpa kontak fisik (SSR) untuk pensaklaran super cepat dan senyap.', 'RELAY');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('VFD Controller Inverter 11kW', 'VFD', 'WECON', 5200000, 'Inverter canggih dengan mode kontrol vektor dan proteksi overload termal.', 'VFD');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Timer Relay Analog 24V/220V', 'RELAY', 'HONEYWELL', 190000, 'Relay waktu tunda (delay) untuk fungsi pengasutan star-delta.', 'RELAY');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Magnetic Contactor 9A', 'KONTAKTOR', 'SIEMENS', 185000, 'Kontaktor mini untuk beban motor kecil dan sirkuit kontrol sekunder.', 'KONTAKTOR');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Miniature Circuit Breaker (MCB) 2P 16A', 'MCB', 'HONEYWELL', 95000, 'Pemutus sirkuit fasa dan netral untuk peralatan fase tunggal.', 'MCB');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Auxiliary Contact Block', 'KONTAKTOR', 'SCHNEIDER', 75000, 'Kontak bantu (NO/NC) tambahan yang dipasang di atas kontaktor magnetik.', 'KONTAKTOR');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Air Circuit Breaker (ACB) 1600A', 'ACB', 'SCHNEIDER', 35000000, 'Pemutus arus udara kapasitas ekstra besar untuk gardu trafo dan LVMDP.', 'MCCB');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Programmable Logic Controller (PLC) 16 I/O', 'PLC', 'WECON', 2800000, 'PLC canggih dengan 8 input digital, 8 output relay, dan port komunikasi ganda.', 'VFD');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('HMI Touch Panel 7 Inch', 'HMI', 'WECON', 3200000, 'Layar sentuh antarmuka manusia-mesin untuk visualisasi dan kontrol sistem.', 'VFD');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('MCCB 3 Phase 100A Fixed', 'MCCB', 'CHINT', 850000, 'Pemutus arus dengan thermal magnetic trip unit untuk keamanan panel.', 'MCCB');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Relay Miniature 24VDC 14-Pin', 'RELAY', 'HONEYWELL', 45000, 'Relay kontrol kecil (MY4) untuk interlock dan switching logika.', 'RELAY');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Socket Relay 14-Pin', 'RELAY', 'HONEYWELL', 20000, 'Dudukan (base) untuk memasang miniature relay pada din rail panel.', 'RELAY');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Variable Frequency Drive (VFD) 30kW', 'VFD', 'SIEMENS', 18500000, 'Inverter kapasitas besar untuk mesin industri berat dan kompresor.', 'VFD');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Control Relay 4PDT 10A', 'RELAY', 'HONEYWELL', 120000, 'Relay kontrol industri 4 kutub untuk logika panel dan interlocking.', 'RELAY');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('VFD Controller Inverter 37kW', 'VFD', 'WECON', 14500000, 'Inverter tugas berat untuk kontrol motor pompa dan kompresor industri besar.', 'VFD');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('PLC Expansion Module 8 AI', 'PLC', 'WECON', 1800000, 'Modul ekspansi PLC untuk 8 analog input (sensor suhu/tekanan).', 'PLC');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('HMI Touch Panel 10 Inch', 'HMI', 'WECON', 5200000, 'Layar sentuh resolusi tinggi 10 inci dengan prosesor cepat untuk SCADA.', 'HMI');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('AC Servo Motor Drive 750W', 'KONTROLER', 'WECON', 4500000, 'Sistem penggerak servo untuk posisi mekanis presisi mesin CNC atau robotik.', 'PLC');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Industrial Power Supply 12VDC 5A', 'POWER SUPPLY', 'WECON', 450000, 'Catu daya switching 12V kompak untuk perangkat instrumentasi ringan.', 'POWER SUPPLY');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('SINAMICS G120 Inverter 15kW', 'VFD', 'SIEMENS', 12500000, 'Inverter modular dengan fitur safety terpadu untuk performa industri.', 'VFD');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('LOGO! 8 Logic Module', 'PLC', 'SIEMENS', 2100000, 'Modul logika pintar dengan display dan antarmuka ethernet untuk kontrol ringan.', 'PLC');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('S7-1200 PLC CPU 1214C', 'PLC', 'SIEMENS', 5800000, 'PLC kelas menengah yang kokoh untuk sistem otomatisasi skala industri.', 'PLC');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('SIRIUS Motor Starter Protector', 'MCB', 'SIEMENS', 850000, 'Pemutus sirkuit pelindung motor (MPCB) dengan ketahanan hubung singkat tinggi.', 'MCB');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('MCCB 3 Phase 100A Honeywell', 'MCCB', 'HONEYWELL', 1250000, 'Pemutus sirkuit Moulded Case Circuit Breaker (MCCB) tangguh untuk proteksi panel utama.', 'MCCB');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Magnetic Contactor 32A Honeywell', 'KONTAKTOR', 'HONEYWELL', 285000, 'Kontaktor magnetik Honeywell untuk kontrol beban motor dan sistem otomatisasi.', 'KONTAKTOR');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('HMI Touch Panel 7 Inch Honeywell', 'HMI', 'HONEYWELL', 3400000, 'Layar sentuh cerdas Honeywell untuk visualisasi mesin dan kontrol SCADA.', 'HMI');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Industrial Power Supply 24VDC 5A', 'POWER SUPPLY', 'HONEYWELL', 550000, 'Catu daya switching Honeywell kompak dan stabil.', 'POWER SUPPLY');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Push Button 22mm Green', 'PUSH BUTTON', 'HONEYWELL', 35000, 'Tombol tekan momentary Honeywell untuk instruksi start/kendali.', 'PUSH BUTTON');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Selector Switch 3 Posisi', 'HANDLE SELECT SWITCH', 'HONEYWELL', 45000, 'Saklar putar 3 posisi handal buatan Honeywell.', 'HANDLE SELECT SWITCH');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Emergency Stop Button 22mm', 'EMERGENCY STOP', 'HONEYWELL', 55000, 'Tombol pemutusan darurat Honeywell tipe jamur merah.', 'EMERGENCY STOP');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Pilot Light 22mm Red', 'PILOT LIGHT', 'HONEYWELL', 25000, 'Indikator lampu merah terang standar industri.', 'PILOT LIGHT');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Panel Buzzer 22mm', 'BUZZER', 'HONEYWELL', 65000, 'Alarm buzzer Honeywell untuk sistem peringatan panel.', 'BUZZER');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Terminal Block 12 Pole Honeywell', 'TERMINAL BLOCKS', 'HONEYWELL', 65000, 'Sambungan kabel terminal blok Honeywell handal.', 'TERMINAL BLOCKS');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Stopper Terminal Block Honeywell', 'STOPPER TERMINAL BLOCK', 'HONEYWELL', 15000, 'Penahan ujung terminal blok Honeywell yang kuat.', 'STOPPER TERMINAL BLOCK');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Thermal Overload Relay Honeywell', 'THERMAL OVERLOAD RELAY', 'HONEYWELL', 295000, 'Relay beban lebih termal Honeywell untuk proteksi motor.', 'THERMAL OVERLOAD RELAY');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Terminal Block 12 Pole CHINT', 'TERMINAL BLOCKS', 'CHINT', 55000, 'Sambungan kabel terminal blok CHINT.', 'TERMINAL BLOCKS');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Stopper Terminal Block CHINT', 'STOPPER TERMINAL BLOCK', 'CHINT', 12000, 'Penahan ujung terminal blok CHINT.', 'STOPPER TERMINAL BLOCK');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Thermal Overload Relay CHINT', 'THERMAL OVERLOAD RELAY', 'CHINT', 275000, 'Relay beban lebih termal CHINT perlindungan sirkuit.', 'THERMAL OVERLOAD RELAY');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Panel Buzzer 22mm CHINT', 'BUZZER', 'CHINT', 55000, 'Alarm buzzer CHINT untuk sistem peringatan panel.', 'BUZZER');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Pilot Light 22mm Red CHINT', 'PILOT LIGHT', 'CHINT', 22000, 'Indikator lampu merah terang CHINT.', 'PILOT LIGHT');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Emergency Stop Button 22mm CHINT', 'EMERGENCY STOP', 'CHINT', 48000, 'Tombol pemutusan darurat CHINT tipe jamur merah.', 'EMERGENCY STOP');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Selector Switch 3 Posisi CHINT', 'HANDLE SELECT SWITCH', 'CHINT', 38000, 'Saklar putar 3 posisi handal buatan CHINT.', 'HANDLE SELECT SWITCH');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Push Button 22mm Green CHINT', 'PUSH BUTTON', 'CHINT', 35000, 'Tombol tekan momentary CHINT untuk instruksi start/kendali.', 'PUSH BUTTON');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Phase Failure Relay NJYB3-15 CHINT', 'PFR RELAY', 'CHINT', 350000, 'Relay kontrol fasa untuk proteksi tegangan dan urutan fasa.', 'PFR RELAY');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Relay Miniature 252648 CHINT', 'RELAY', 'CHINT', 45000, 'Relay kontrol miniatur handal buatan CHINT.', 'RELAY');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Panel Buzzer 22mm SIEMENS', 'BUZZER', 'SIEMENS', 60000, 'Alarm buzzer SIEMENS untuk sistem peringatan panel.', 'BUZZER');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Emergency Stop Button 22mm SIEMENS', 'EMERGENCY STOP', 'SIEMENS', 65000, 'Tombol pemutusan darurat SIEMENS.', 'EMERGENCY STOP');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('HMI Touch Panel SIEMENS', 'HMI', 'SIEMENS', 4500000, 'Layar sentuh antarmuka SIEMENS.', 'HMI');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Pilot Light 22mm SIEMENS', 'PILOT LIGHT', 'SIEMENS', 30000, 'Indikator lampu SIEMENS.', 'PILOT LIGHT');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Thermal Overload Relay SIEMENS', 'THERMAL OVERLOAD RELAY', 'SIEMENS', 320000, 'Relay beban lebih termal SIEMENS.', 'THERMAL OVERLOAD RELAY');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Phase Failure Relay SIEMENS', 'PFR RELAY', 'SIEMENS', 450000, 'Relay kontrol fasa SIEMENS.', 'PFR RELAY');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Industrial Power Supply SIEMENS', 'POWER SUPPLY', 'SIEMENS', 650000, 'Catu daya switching SIEMENS.', 'POWER SUPPLY');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Push Button 22mm SIEMENS', 'PUSH BUTTON', 'SIEMENS', 40000, 'Tombol tekan SIEMENS.', 'PUSH BUTTON');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Socket Relay SIEMENS', 'RELAY', 'SIEMENS', 55000, 'Relay kontrol SIEMENS.', 'RELAY');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Selector Switch 3 Posisi SIEMENS', 'HANDLE SELECT SWITCH', 'SIEMENS', 50000, 'Saklar putar SIEMENS.', 'HANDLE SELECT SWITCH');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Stopper Terminal Block SIEMENS', 'STOPPER TERMINAL BLOCK', 'SIEMENS', 15000, 'Penahan ujung terminal blok SIEMENS.', 'STOPPER TERMINAL BLOCK');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('Terminal Block SIEMENS', 'TERMINAL BLOCKS', 'SIEMENS', 75000, 'Sambungan kabel terminal blok SIEMENS.', 'TERMINAL BLOCKS');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('MCB 1 Phase SIEMENS', 'MCB', 'SIEMENS', 55000, 'MCB 1 fasa SIEMENS.', 'MCB');
INSERT INTO components (name, category, supplier, price, description, tag) VALUES ('MCCB 3 Phase SIEMENS', 'MCCB', 'SIEMENS', 850000, 'Pemutus sirkuit MCCB SIEMENS.', 'MCCB');
