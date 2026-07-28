const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const path = require('path');
const fs = require('fs');

let sock;
let qrCodeData = null;
let connectionState = 'menunggu'; // 'menunggu', 'terkoneksi', 'terputus'
let adminNumber = process.env.ADMIN_WA_NUMBER || '6281234567890'; // Default placeholder, replace with real number

async function connectToWhatsApp() {
    const authFolder = path.join(__dirname, 'auth_info_baileys');
    const { state, saveCreds } = await useMultiFileAuthState(authFolder);

    sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: 'silent' }), // Suppress detailed logs
        browser: ['Mitra Clima Pro Bot', 'Chrome', '1.0.0']
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            qrCodeData = qr; // Save QR code string
            connectionState = 'menunggu';
            console.log('WhatsApp QR Code generated, waiting for scan...');
        }

        if (connection === 'close') {
            qrCodeData = null;
            const shouldReconnect = (lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut);
            console.log('WhatsApp connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
            
            if (shouldReconnect) {
                connectToWhatsApp();
            } else {
                connectionState = 'terputus';
                console.log('WhatsApp logged out. Need to scan again.');
                // Delete auth info to allow re-scan
                if (fs.existsSync(authFolder)) {
                    fs.rmSync(authFolder, { recursive: true, force: true });
                }
                setTimeout(connectToWhatsApp, 2000); // Restart to generate new QR
            }
        } else if (connection === 'open') {
            console.log('WhatsApp connection opened successfully!');
            connectionState = 'terkoneksi';
            qrCodeData = null; 
        }
    });

    // Auto-reply logic
    sock.ev.on('messages.upsert', async m => {
        const msg = m.messages[0];
        if (!msg.key.fromMe && m.type === 'notify') {
            const remoteJid = msg.key.remoteJid;
            
            // Avoid replying to status updates or groups
            if (!remoteJid.includes('@g.us') && remoteJid !== 'status@broadcast') {
                try {
                    await sock.readMessages([msg.key]); // Mark as read
                    await sock.sendMessage(remoteJid, { 
                        text: 'Halo! 👋\nTerima kasih telah menghubungi Mitra Clima Pro.\n\nPesan Anda telah kami terima. Admin kami akan segera membalas pesan Anda sesaat lagi.\n\n_Ini adalah pesan otomatis._' 
                    });
                } catch (err) {
                    console.error('Failed to send auto-reply:', err);
                }
            }
        }
    });
}

function getStatus() {
    return {
        status: connectionState,
        qr: qrCodeData
    };
}

async function sendMessageToAdmin(messageText) {
    if (connectionState !== 'terkoneksi' || !sock) {
        console.log('Cannot send message, WhatsApp not connected.');
        return false;
    }
    try {
        let formattedNumber = adminNumber.replace(/[^0-9]/g, '');
        if (formattedNumber.startsWith('0')) {
            formattedNumber = '62' + formattedNumber.substring(1);
        }
        const jid = formattedNumber + '@s.whatsapp.net';
        await sock.sendMessage(jid, { text: messageText });
        return true;
    } catch (error) {
        console.error('Failed to send WhatsApp message:', error);
        return false;
    }
}

function logoutWhatsApp() {
    if (sock) {
        sock.logout();
        connectionState = 'terputus';
    }
}

module.exports = {
    connectToWhatsApp,
    getStatus,
    sendMessageToAdmin,
    logoutWhatsApp
};
