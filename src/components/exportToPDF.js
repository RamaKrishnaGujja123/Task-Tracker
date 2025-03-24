import { jsPDF } from 'jspdf';
import "../styles/exportToPDF.css";

const exportToPDF = (tasks) => {
  const doc = new jsPDF();
  doc.text("Task List", 20, 20);

  tasks.forEach((task, index) => {
    doc.text(`${index + 1}. ${task.name}`, 20, 30 + index * 10);
  });

  doc.save('tasks.pdf');
};

export default exportToPDF;
