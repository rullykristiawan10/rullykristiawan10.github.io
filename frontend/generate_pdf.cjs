const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({ margin: 50 });
doc.pipe(fs.createWriteStream('./public/profil-perusahaan.pdf'));

doc.fontSize(24).fillColor('#004b93').text('PT. Mitra Clima Electrindo', { align: 'center' });
doc.moveDown();

doc.fontSize(14).fillColor('#333333').text('PROFIL PERUSAHAAN', { align: 'center', underline: true });
doc.moveDown(2);

doc.fontSize(12).fillColor('#555555').text(
  'PT. Mitra Clima Electrindo adalah perusahaan yang bergerak di bidang electrical contractor dan instalasi listrik yang berpengalaman dan terpercaya di Indonesia. Berdiri dengan komitmen untuk memberikan solusi kelistrikan terbaik, kami telah melayani berbagai sektor industri, komersial, dan perumahan di seluruh Indonesia.',
  { align: 'justify', lineGap: 5 }
);
doc.moveDown();

doc.text(
  'Bidang usaha kami meliputi electrical contractor, instalasi listrik industri, instalasi listrik komersial, instalasi listrik perumahan, maintenance sistem kelistrikan, instalasi panel listrik dan switchboard, grounding system, serta lightning protection system.',
  { align: 'justify', lineGap: 5 }
);
doc.moveDown();

doc.text(
  'Dengan tenaga ahli bersertifikat dan berpengalaman, PT. Mitra Clima Electrindo berkomitmen untuk menghadirkan pekerjaan kelistrikan yang aman, berkualitas tinggi, dan sesuai dengan standar nasional maupun internasional. Kepuasan klien dan keselamatan kerja menjadi prioritas utama dalam setiap proyek yang kami kerjakan.',
  { align: 'justify', lineGap: 5 }
);
doc.moveDown(2);

doc.fontSize(16).fillColor('#004b93').text('Visi dan Misi Perusahaan');
doc.moveDown();

doc.fontSize(12).fillColor('#555555').text(
  'PT. Mitra Clima Electrindo berkomitmen untuk menjadi perusahaan kontraktor listrik terdepan yang mengutamakan kualitas, keamanan, dan inovasi dalam setiap proyek yang dikerjakan.',
  { align: 'justify', lineGap: 5 }
);
doc.moveDown();

doc.fontSize(14).fillColor('#333333').text('Visi:');
doc.fontSize(12).fillColor('#555555').text(
  'Menjadi perusahaan electrical contractor dan instalasi listrik terpercaya, profesional, dan terdepan di Indonesia yang menghadirkan solusi kelistrikan berkualitas tinggi dengan standar keamanan internasional.',
  { align: 'justify', lineGap: 5 }
);
doc.moveDown();

doc.fontSize(14).fillColor('#333333').text('Misi:');
doc.fontSize(12).fillColor('#555555')
   .text('• Memberikan layanan instalasi listrik yang aman, handal, dan berkualitas tinggi kepada setiap klien.', { lineGap: 5 })
   .text('• Mengembangkan sumber daya manusia yang kompeten dan bersertifikat di bidang kelistrikan.', { lineGap: 5 })
   .text('• Menerapkan teknologi terkini dan inovasi dalam setiap proyek instalasi listrik untuk hasil yang optimal dan berkelanjutan.', { lineGap: 5 });

doc.end();
